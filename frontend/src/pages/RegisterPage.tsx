import React from "react";
import { Navigate, Link } from "react-router-dom";
import { RegisterForm } from "../components/auth/RegisterForm";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage: React.FC = () => {
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
                <h1>Create Account</h1>
                <RegisterForm />
                <div className="auth-links">
                    <p>
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
