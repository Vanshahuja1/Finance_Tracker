import axiosInstance from "./axiosInstance";
import { Transaction, TransactionsResponse } from "../types";

interface TransactionFilters {
    filter?: string;
    sort?: string;
    order?: string;
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
}

export const getTransactions = async (filters: TransactionFilters = {}): Promise<TransactionsResponse> => {
    const { data } = await axiosInstance.get("/transactions", { params: filters });
    return data;
};

export const createTransaction = async (
    transaction: Omit<Transaction, "_id" | "user">
): Promise<Transaction> => {
    const { data } = await axiosInstance.post("/transactions", transaction);
    return data;
};

export const deleteTransaction = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/transactions/${id}`);
};

export const getTransactionStats = async (startDate?: string, endDate?: string) => {
    const params: { startDate?: string; endDate?: string } = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const { data } = await axiosInstance.get("/transactions/stats", { params });
    return data;
};
