import React from "react";
import { useAuth } from "../contexts/AuthContext";
import TransactionManager from "../components/transactions/TransactionManager";

const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <h1>Welcome, {user?.name}!</h1>
                <p className="subtitle">Manage your finances with ease</p>
            </div>

            <div className="dashboard-content">
                <TransactionManager />
            </div>
        </div>
    );
};

export default DashboardPage;
