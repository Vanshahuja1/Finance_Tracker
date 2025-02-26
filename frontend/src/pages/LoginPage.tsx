import React from "react";
import { Navigate, Link } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { useAuth } from "../contexts/AuthContext";

const LoginPage: React.FC = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1>Login to Finance Tracker</h1>
                <LoginForm />
                <div className="auth-links">
                    <p>
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
