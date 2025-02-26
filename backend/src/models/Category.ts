import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    name: string;
    type: "income" | "expense" | "any";
}

const CategorySchema = new Schema<ICategory>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        type: { type: String, enum: ["income", "expense", "any"], default: "any" },
    },
    { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;
