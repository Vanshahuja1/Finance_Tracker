import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getTransactions,
    createTransaction,
    deleteTransaction,
} from "../../api/transactionsApi";
import { getCategories } from "../../api/categoriesApi";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TransactionFilters from "./TransactionFilters";
import Summary from "./Summary";

export const TransactionManager: React.FC = () => {
    const queryClient = useQueryClient();
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        filter: "all",
        sort: "date",
        order: "desc",
        page: 1,
    });

    // Fetch transactions with filters
    const {
        data: transactionsData,
        isLoading: isLoadingTransactions,
        isError: isTransactionsError,
    } = useQuery(["transactions", filters], () => getTransactions(filters), {
        keepPreviousData: true,
    });

    // Fetch categories
    const {
        data: categories = [],
        isLoading: isLoadingCategories,
        isError: isCategoriesError,
    } = useQuery(["categories"], getCategories);

    // Create transaction mutation
    const createMutation = useMutation(createTransaction, {
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
            setError(null);
        },
        onError: (error: any) => {
            setError(error.response?.data?.error || "Failed to create transaction");
        },
    });

    // Delete transaction mutation
    const deleteMutation = useMutation(deleteTransaction, {
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
            setError(null);
        },
        onError: (error: any) => {
            setError(error.response?.data?.error || "Failed to delete transaction");
        },
    });

    const handleCreateTransaction = (values: {
        type: "income" | "expense";
        category: string;
        amount: number;
        date: string;
        description?: string;
    }) => {
        createMutation.mutate(values);
    };

    const handleDeleteTransaction = (id: string) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            deleteMutation.mutate(id);
        }
    };

    const handleFilterChange = (newFilters: any) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
            page: 1, // Reset page when filters change
        }));
    };

    if (isTransactionsError || isCategoriesError) {
        return <div className="error">Error loading data</div>;
    }

    const isLoading =
        isLoadingTransactions ||
        isLoadingCategories ||
        createMutation.isLoading ||
        deleteMutation.isLoading;

    return (
        <div className="transaction-manager">
            {error && <div className="error-message">{error}</div>}

            <div className="section">
                <h2>Summary</h2>
                <Summary transactions={transactionsData?.transactions || []} />
            </div>

            <div className="section">
                <h2>Add Transaction</h2>
                <TransactionForm
                    categories={categories}
                    onSubmit={handleCreateTransaction}
                    isLoading={isLoading}
                />
            </div>

            <div className="section">
                <h2>Transactions</h2>
                <TransactionFilters
                    onFilterChange={handleFilterChange}
                    isLoading={isLoading}
                />
                <TransactionList
                    transactions={transactionsData?.transactions || []}
                    onDelete={handleDeleteTransaction}
                    isLoading={isLoading}
                />
                {transactionsData?.pagination && (
                    <div className="pagination">
                        <button
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
                            }
                            disabled={
                                isLoading || transactionsData.pagination.page <= 1
                            }
                        >
                            Previous
                        </button>
                        <span>
                            Page {transactionsData.pagination.page} of{" "}
                            {transactionsData.pagination.totalPages}
                        </span>
                        <button
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
                            }
                            disabled={
                                isLoading ||
                                transactionsData.pagination.page >=
                                transactionsData.pagination.totalPages
                            }
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionManager;
