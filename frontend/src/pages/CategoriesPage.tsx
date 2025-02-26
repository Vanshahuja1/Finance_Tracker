import React from "react";
import CategoryManager from "../components/categories/CategoryManager";

const CategoriesPage: React.FC = () => {
    return (
        <div className="categories-page">
            <div className="categories-header">
                <h1>Manage Categories</h1>
                <p className="subtitle">Create and manage your income and expense categories</p>
            </div>

            <div className="categories-content">
                <CategoryManager />
            </div>
        </div>
    );
};

export default CategoriesPage;
