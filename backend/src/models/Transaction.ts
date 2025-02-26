import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    type: "income" | "expense";
    category: mongoose.Types.ObjectId;
    amount: number;
    date: Date;
    description?: string;
}

const TransactionSchema = new Schema<ITransaction>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        type: { type: String, enum: ["income", "expense"], required: true },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const Transaction = mongoose.model<ITransaction>("Transaction", TransactionSchema);
export default Transaction;
