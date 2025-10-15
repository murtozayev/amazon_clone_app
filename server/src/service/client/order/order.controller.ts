import { request, response } from "express";
import CART from "../../../models/cart.model.ts";
import error from "../../../errors/error.ts";
import CARD from "../../../models/card.model.ts";
import ORDER from "../../../models/order.model.ts";

export async function addOrder(req: typeof request, res: typeof response) {
    try {

        const userId = (req.user as { _id: string })._id

        const carts = await CART.findOne({ author: userId })

        if (!carts) {
            return error(res, "Savat yo'q bunaqa", 404)
        }

        const selectedItems = carts.items.filter((c) => c.select === true)

        if (selectedItems.length < 1) {
            return error(res, "Birorta element tanlanmagan")
        }

        const cards = await CARD.findOne({ author: userId })

        if (!cards) {
            return error(res, "Kartalar topilmadi", 404)
        }

        const cardIndex = cards.cards.findIndex(c => c.cardNumber === Number(req.body.cardNumber))

        if (cardIndex === -1) {
            return error(res, "Bunday karta topilmadi", 404)
        }

        const selectedCard = cards.cards[cardIndex] as { cardBalance: number }

        const totalPrice = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0)

        if (totalPrice > selectedCard?.cardBalance) {
            return error(res, "Sizda order uchun mablag' yetarli emas")
        }

        let order = await ORDER.findOne({ author: userId })

        if (!order) {
            order = await ORDER.create({ author: userId, orders: [] })
        }

        order.orders.push({
            items: selectedItems,
            totalPrice,
        })

        selectedCard.cardBalance -= totalPrice

        await cards.save()

        await order.save()

        return res.status(200).json({ message: "Order qo'shildi", order })

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function getAllOrders(req: typeof request, res: typeof response) {
    try {
        const orders = await ORDER.findOne({ author: (req.user as { _id: number })._id })

        if (!orders) {
            return error(res, "Order topilmadi", 404)
        }

        return res.status(200).json(orders)
    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function oneOrder(req: typeof request, res: typeof response) {
    try {
        const orders = await ORDER.findOne({ author: (req.user as { _id: number })._id })

        if (!orders) {
            return error(res, "Order topilmadi", 404)
        }

        const oneOrder = orders.orders.find(o => o._id.toString() === req.params.id?.toString())

        if (!oneOrder) {
            return error(res, "Order topilmadi", 404)
        }

        return res.status(200).json(oneOrder)

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function deleteOrder(req: typeof request, res: typeof response) {
    try {
        const orders = await ORDER.findOne({ author: (req.user as { _id: number })._id })

        if (!orders) {
            return error(res, "Order topilmadi", 404)
        }

        const orderIndex = orders.orders.findIndex(c => c._id.toString() === req.params.id?.toString())

        if (orderIndex === -1) {
            return error(res, "Order topilmadi")
        }

        orders.orders.splice(orderIndex, 1)

        await orders.save()

        return res.status(200).json({ message: "Order o'chirildi" })

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function clearOrder(req: typeof request, res: typeof response) {
    try {
        const orders = await ORDER.findOne({ author: (req.user as { _id: string })._id })

        if (!orders) {
            return error(res, "Order topilmadi", 404)
        }

        if (orders.orders) {
            //@ts-ignore
            orders.orders = []
        }

        await orders.save()

        return res.status(200).json({message: "Order tozalandi"})

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}