import { request, response } from "express";
import error from "../../../errors/error.ts";
import ORDER from "../../../models/order.model.ts";

export async function orderStatus(req: typeof request, res: typeof response) {
    try {
        const { status } = req.body;

        if (!status || !["going", "done"].includes(status)) {
            return error(res, "Xato status yoki umuman status yo'q", 400);
        }

        const orders = await ORDER.findOne({ author: req.params.userId });
        if (!orders) return error(res, "Order topilmadi", 404);

        const orderIndex = orders.orders.findIndex(o => o._id.toString() === req.params.id);
        if (orderIndex === -1) return error(res, "Order topilmadi", 404);

        //@ts-ignore
        orders.orders[orderIndex].status = status;
        await orders.save();

        return res.status(200).json(orders.orders[orderIndex]);

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function getAllOrders(req: typeof request, res: typeof response) {
    return res.status(200).json(await ORDER.find({}))
}

export async function oneOrder(req: typeof request, res: typeof response) {
    try {
        const orders = await ORDER.findOne({ author: req.params.userId })

        const orderIndex = orders?.orders.findIndex(o => o._id.toString() === req.params.id) as number

        if (orderIndex === -1 || !orders) {
            return error(res, "Orderlar topilmadi")
        }

        return res.status(200).json(orders.orders[orderIndex])

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}