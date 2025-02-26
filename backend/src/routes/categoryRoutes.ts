import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
    createCategory,
    deleteCategory,
    getCategories,
    updateCategory,
} from "../controllers/categoryController";
import { validateRequest } from "../middleware/validateRequest";
import { categorySchema } from "../validators/categoryValidators";

const router = Router();

router.use(protect);

router.post("/", validateRequest(categorySchema), createCategory);
router.get("/", getCategories);
router.put("/:id", validateRequest(categorySchema), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
