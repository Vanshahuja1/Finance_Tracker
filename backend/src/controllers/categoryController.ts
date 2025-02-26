import { Request, Response } from "express";
import Category, { ICategory } from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, type } = req.body;
        const user = req.user._id;
        const category = await Category.create({ user, name, type }) as ICategory;
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const user = req.user._id;
        const categories = await Category.find({ user });
        res.json(categories);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type } = req.body;
        const user = req.user._id;

        const category = await Category.findOneAndUpdate(
            { _id: id, user },
            { name, type },
            { new: true }
        );
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = req.user._id;

        const category = await Category.findOneAndDelete({ _id: id, user });
        if (!category) return res.status(404).json({ error: "Category not found" });
        res.json({ message: "Category deleted" });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};
