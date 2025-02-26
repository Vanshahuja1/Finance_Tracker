import axiosInstance from "./axiosInstance";
import { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get("/categories");
    return data;
};

export const createCategory = async (
    name: string,
    type: string
): Promise<Category> => {
    const { data } = await axiosInstance.post("/categories", { name, type });
    return data;
};

export const updateCategory = async (
    id: string,
    name: string,
    type: string
): Promise<Category> => {
    const { data } = await axiosInstance.put(`/categories/${id}`, { name, type });
    return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/categories/${id}`);
};
