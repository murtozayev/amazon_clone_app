import e from "express";
import { createProduct, deleteProduct, updateProduct } from "./product.controller.ts";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import { checkOwner, checkRole } from "../../../middlewares/role.middleware.ts";
import { checkBan } from "../../../middlewares/report.middleware.ts";

const productRoute = e.Router()

productRoute.post("/create", authMiddleware, checkRole, checkBan, createProduct)
productRoute.put("/update/:id", authMiddleware, checkRole, checkBan, updateProduct)
productRoute.post("/delete-many", authMiddleware, checkOwner, checkBan, deleteProduct)

export default productRoute