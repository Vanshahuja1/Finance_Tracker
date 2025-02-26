import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../../api/categoriesApi";
import { Category } from "../../types";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

export const CategoryManager: React.FC = () => {
    const queryClient = useQueryClient();
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Fetch categories
    const {
        data: categories = [],
        isLoading,
        isError,
    } = useQuery(["categories"], getCategories);

    // Create category mutation
    const createMutation = useMutation(
        (data: { name: string; type: string }) =>
            createCategory(data.name, data.type),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["categories"]);
                setError(null);
            },
            onError: (error: any) => {
                setError(error.response?.data?.error || "Failed to create category");
            },
        }
    );

    // Update category mutation
    const updateMutation = useMutation(
        (data: { id: string; name: string; type: string }) =>
            updateCategory(data.id, data.name, data.type),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["categories"]);
                setEditingCategory(null);
                setError(null);
            },
            onError: (error: any) => {
                setError(error.response?.data?.error || "Failed to update category");
            },
        }
    );

    // Delete category mutation
    const deleteMutation = useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"]);
            setError(null);
        },
        onError: (error: any) => {
            setError(error.response?.data?.error || "Failed to delete category");
        },
    });

    const handleSubmit = (name: string, type: string) => {
        if (editingCategory) {
            updateMutation.mutate({
                id: editingCategory._id,
                name,
                type,
            });
        } else {
            createMutation.mutate({ name, type });
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setError(null);
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteMutation.mutate(id);
        }
    };

    if (isError) {
        return <div className="error">Error loading categories</div>;
    }

    return (
        <div className="category-manager">
            <h2>{editingCategory ? "Edit Category" : "Add Category"}</h2>
            {error && <div className="error-message">{error}</div>}
            <CategoryForm
                onSubmit={handleSubmit}
                initialCategory={editingCategory || undefined}
                isLoading={createMutation.isLoading || updateMutation.isLoading}
            />
            {editingCategory && (
                <button
                    onClick={() => setEditingCategory(null)}
                    className="cancel-button"
                >
                    Cancel Editing
                </button>
            )}
            <h2>Categories</h2>
            <CategoryList
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isLoading={isLoading || deleteMutation.isLoading}
            />
        </div>
    );
};

export default CategoryManager;
