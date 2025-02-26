import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const generateToken = (id: string): string => {
    return jwt.sign({ id }, ENV.JWT_SECRET, { expiresIn: "7d" });
};
