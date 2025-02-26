import React, { createContext, useState, useEffect, useContext } from "react";
import { User } from "../types";
import { getMe } from "../api/authApi";

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    login: (token: string, userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    login: () => { },
    logout: () => { },
    isLoading: true,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getMe()
                .then((userData) => {
                    setUser(userData);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setUser(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem("token", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
