import axiosInstance from "./axiosInstance";
import { AuthResponse } from "../types";

export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
    });
    return data;
};

export const loginUser = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    const { data } = await axiosInstance.post("/auth/login", { email, password });
    return data;
};

export const getMe = async (): Promise<AuthResponse> => {
    const { data } = await axiosInstance.get("/auth/me");
    return data;
};
