import React, { useState, useEffect } from "react";
import { Category } from "../../types";

interface CategoryFormProps {
    onSubmit: (name: string, type: string) => void;
    initialCategory?: Category;
    isLoading?: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
    onSubmit,
    initialCategory,
    isLoading = false,
}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState<"income" | "expense" | "any">("any");

    useEffect(() => {
        if (initialCategory) {
            setName(initialCategory.name);
            setType(initialCategory.type);
        }
    }, [initialCategory]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name, type);
        if (!initialCategory) {
            // Only clear form if we're creating a new category
            setName("");
            setType("any");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
                <label htmlFor="name">Category Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    required
                    disabled={isLoading}
                />
            </div>
            <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value as "income" | "expense" | "any")}
                    disabled={isLoading}
                >
                    <option value="any">Any</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading
                    ? "Saving..."
                    : initialCategory
                        ? "Update Category"
                        : "Add Category"}
            </button>
        </form>
    );
};

export default CategoryForm;
