import type e from "express";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import auth from "../service/auth/routes/auth.router.ts";
import connectDb from "../database/connect.db.ts";
import limiter from "./rate.limit.ts";
import productRoute from "../service/dashboard/product/dashboard.router.ts";
import productRouteClient from "../service/client/product/client.router.ts";
import recentRouter from "../service/client/recent/recent.router.ts";
import cartRouter from "../service/client/cart/cart.router.ts";
import cardRouter from "../service/client/card/card.router.ts";
import profileRouter from "../service/client/profile/profile.router.ts";
import orderRouter from "../service/client/order/order.router.ts";
import orderDashRouter from "../service/dashboard/order_management/order.router.ts";
import userRouter from "../service/dashboard/user_management/user.router.ts";
import taskRouter from "../service/dashboard/task_management/task.router.ts";

export default function (express: typeof e, app: e.Application) {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(cors({ origin: "http://localhost:1420", credentials: true }))
    app.use("/api/auth", auth)
    app.use("/api/dashboard/product", productRoute)
    app.use("/api/dashboard/order", orderDashRouter)
    app.use("/api/dashboard/users", userRouter)
    app.use("/api/dashboard/task", taskRouter)
    app.use("/api/client", productRouteClient)
    app.use("/api/recents", recentRouter)
    app.use("/api/cart", cartRouter)
    app.use("/api/card", cardRouter)
    app.use("/api/profile", profileRouter)
    app.use("/api/order", orderRouter)
    connectDb()
}