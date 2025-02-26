import React from "react";
import { Transaction } from "../../types";

interface SummaryProps {
    transactions: Transaction[];
}

const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};

export const Summary: React.FC<SummaryProps> = ({ transactions }) => {
    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return (
        <div className="summary">
            <div className="summary-card income">
                <h3>Income</h3>
                <p className="amount">{formatAmount(income)}</p>
            </div>
            <div className="summary-card expenses">
                <h3>Expenses</h3>
                <p className="amount">{formatAmount(expenses)}</p>
            </div>
            <div className="summary-card balance">
                <h3>Balance</h3>
                <p className={`amount ${balance >= 0 ? "positive" : "negative"}`}>
                    {formatAmount(Math.abs(balance))}
                    <span className="balance-type">{balance >= 0 ? "Credit" : "Deficit"}</span>
                </p>
            </div>
        </div>
    );
};

export default Summary;
