import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import User from "../models/User";

interface JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let token: string | undefined;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ error: "Not authorized, user not found" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ error: "Not authorized, token failed" });
    }
};
