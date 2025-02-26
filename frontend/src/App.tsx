import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/layout/Header";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <BrowserRouter>
                    <div className="app">
                        <Header />
                        <main className="main-content">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />

                                {/* Protected Routes */}
                                <Route element={<ProtectedRoute />}>
                                    <Route path="/" element={<DashboardPage />} />
                                    <Route path="/categories" element={<CategoriesPage />} />
                                </Route>

                                {/* 404 Route */}
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </main>
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;
