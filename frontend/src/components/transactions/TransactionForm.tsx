import React, { useState } from "react";
import { Category } from "../../types";

interface TransactionFormProps {
    categories: Category[];
    onSubmit: (values: {
        type: "income" | "expense";
        category: string;
        amount: number;
        date: string;
        description?: string;
    }) => void;
    isLoading?: boolean;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
    categories,
    onSubmit,
    isLoading = false,
}) => {
    const [type, setType] = useState<"income" | "expense">("expense");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            type,
            category,
            amount: parseFloat(amount),
            date,
            description: description.trim() || undefined,
        });

        // Reset form
        setAmount("");
        setDescription("");
        setDate(new Date().toISOString().split("T")[0]);
    };

    const filteredCategories = categories.filter(
        (cat) => cat.type === type || cat.type === "any"
    );

    return (
        <form onSubmit={handleSubmit} className="transaction-form">
            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value as "income" | "expense");
                            setCategory(""); // Reset category when type changes
                        }}
                        disabled={isLoading}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        disabled={isLoading}
                    >
                        <option value="">Select Category</option>
                        {filteredCategories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder="0.00"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isLoading}
                    placeholder="Enter description"
                    rows={3}
                />
            </div>

            <button type="submit" disabled={isLoading} className="submit-button">
                {isLoading ? "Adding..." : `Add ${type}`}
            </button>
        </form>
    );
};

export default TransactionForm;
