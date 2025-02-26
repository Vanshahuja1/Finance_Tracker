import React, { useState } from "react";

interface TransactionFiltersProps {
    onFilterChange: (filters: {
        filter: string;
        sort: string;
        order: string;
        startDate?: string;
        endDate?: string;
    }) => void;
    isLoading?: boolean;
}

export const TransactionFilters: React.FC<TransactionFiltersProps> = ({
    onFilterChange,
    isLoading = false,
}) => {
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");
    const [order, setOrder] = useState("desc");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleApplyFilters = () => {
        onFilterChange({
            filter,
            sort,
            order,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
        });
    };

    const handleReset = () => {
        setFilter("all");
        setSort("date");
        setOrder("desc");
        setStartDate("");
        setEndDate("");
        onFilterChange({
            filter: "all",
            sort: "date",
            order: "desc",
        });
    };

    return (
        <div className="transaction-filters">
            <div className="filters-row">
                <div className="filter-group">
                    <label htmlFor="filter">Type</label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        disabled={isLoading}
                    >
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="sort">Sort By</label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        disabled={isLoading}
                    >
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="order">Order</label>
                    <select
                        id="order"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        disabled={isLoading}
                    >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>

            <div className="filters-row">
                <div className="filter-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        disabled={isLoading}
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="endDate">End Date</label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        disabled={isLoading}
                        min={startDate}
                    />
                </div>

                <div className="filter-actions">
                    <button
                        onClick={handleApplyFilters}
                        disabled={isLoading}
                        className="apply-button"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={handleReset}
                        disabled={isLoading}
                        className="reset-button"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionFilters;
