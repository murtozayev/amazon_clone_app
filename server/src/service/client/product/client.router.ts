import e from "express";
import { addFav, allProducts, getAllFavs, getOne, likeUnlike, searchProduct } from "./client.controller.ts";
import authMiddleware from "../../../middlewares/auth.middleware.ts";
import removeReport from "../../../middlewares/remove.report.ts";
import { checkBan } from "../../../middlewares/report.middleware.ts";

const productRouteClient = e.Router()

productRouteClient.use(removeReport)

productRouteClient.get("/all", allProducts)
productRouteClient.get("/one/:id", getOne)
productRouteClient.get("/search", searchProduct)
productRouteClient.post("/fav/:id", authMiddleware, checkBan, addFav)
productRouteClient.get("/favs", authMiddleware, getAllFavs)
productRouteClient.put("/like/:id", authMiddleware, likeUnlike)

export default productRouteClient