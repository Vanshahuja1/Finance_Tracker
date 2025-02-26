import React from "react";
import { Category } from "../../types";

interface CategoryListProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: string) => void;
    isLoading?: boolean;
}

export const CategoryList: React.FC<CategoryListProps> = ({
    categories,
    onEdit,
    onDelete,
    isLoading = false,
}) => {
    if (isLoading) {
        return <div className="loading">Loading categories...</div>;
    }

    if (categories.length === 0) {
        return (
            <div className="no-data">No categories found. Create one to get started!</div>
        );
    }

    return (
        <div className="category-list">
            {categories.map((category) => (
                <div key={category._id} className="category-item">
                    <div className="category-info">
                        <span className="category-name">{category.name}</span>
                        <span className={`category-type type-${category.type}`}>
                            {category.type}
                        </span>
                    </div>
                    <div className="category-actions">
                        <button
                            onClick={() => onEdit(category)}
                            disabled={isLoading}
                            className="edit-button"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(category._id)}
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

export default CategoryList;
