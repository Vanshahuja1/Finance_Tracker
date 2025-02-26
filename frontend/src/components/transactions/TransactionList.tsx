import React from "react";
import { Transaction, Category } from "../../types";

interface TransactionListProps {
    transactions: Transaction[];
    onDelete: (id: string) => void;
    isLoading?: boolean;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

export const TransactionList: React.FC<TransactionListProps> = ({
    transactions,
    onDelete,
    isLoading = false,
}) => {
    if (isLoading) {
        return <div className="loading">Loading transactions...</div>;
    }

    if (transactions.length === 0) {
        return (
            <div className="no-data">No transactions found. Add one to get started!</div>
        );
    }

    return (
        <div className="transaction-list">
            {transactions.map((transaction) => (
                <div
                    key={transaction._id}
                    className={`transaction-item ${transaction.type}`}
                >
                    <div className="transaction-main">
                        <div className="transaction-info">
                            <span className="transaction-category">
                                {(transaction.category as Category).name}
                            </span>
                            {transaction.description && (
                                <span className="transaction-description">
                                    {transaction.description}
                                </span>
                            )}
                        </div>
                        <div className="transaction-amount">
                            <span className={`amount ${transaction.type}`}>
                                {transaction.type === "expense" ? "-" : "+"}
                                {formatAmount(transaction.amount)}
                            </span>
                        </div>
                    </div>
                    <div className="transaction-footer">
                        <span className="transaction-date">
                            {formatDate(transaction.date)}
                        </span>
                        <button
                            onClick={() => onDelete(transaction._id!)}
                            disabled={isLoading}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;
