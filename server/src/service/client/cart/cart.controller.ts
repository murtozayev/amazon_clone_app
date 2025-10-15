import { request, response } from "express";
import error from "../../../errors/error.ts";
import PRODUCT from "../../../models/product.model.ts";
import CART from "../../../models/cart.model.ts";

export async function addToCart(req: typeof request, res: typeof response) {
    try {
        const productId = req.params.id;

        const product = await PRODUCT.findById(productId);
        if (!product) {
            return error(res, "Mahsulot topilmadi", 404);
        }

        const user = req.user as { _id: string };

        let cart = await CART.findOne({ author: user._id });

        if (!cart) {
            cart = await CART.create({
                author: user._id,
                items: [
                    {
                        product: product.toObject(),
                        quantity: 1,
                        totalPrice: product.price,
                    },
                ],
            });

            return res.status(201).json({
                message: "Mahsulot savatga qo'shildi",
                cart,
            });
        }

        const existingIndex = cart.items.findIndex(
            (p: any) => p.product._id.toString() === product._id.toString()
        );

        if (cart && existingIndex !== -1 && cart.items[existingIndex]) {
            const item = cart.items[existingIndex];
            item.quantity += 1;
            item.totalPrice = item.quantity * product.price;
        } else {
            cart.items.push({
                product: product.toObject(),
                quantity: 1,
                totalPrice: product.price,
            });
        }

        await cart.save();

        return res.status(200).json({
            message: "Mahsulot savatga qo'shildi ✅",
            cart,
        });

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function removeFromCart(req: typeof request, res: typeof response) {
    try {
        const productId = req.params.id;
        const user = req.user as { _id: string };

        const cart = await CART.findOne({ author: user._id });

        if (!cart) {
            return error(res, "Savat bo'sh", 404);
        }

        const isHasCart = cart.items.findIndex(
            (p: any) => p.product._id.toString() === productId?.toString()
        );

        if (isHasCart === -1) {
            return error(res, "Savatda bunday mahsulot yo'q", 404);
        }

        cart.items.splice(isHasCart, 1);
        await cart.save();

        return res.status(200).json({
            message: "Mahsulot savatdan o'chirildi ✅",
            cart,
        });
    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function carts(req: typeof request, res: typeof response) {
    try {
        const user = req.user as { _id: string };

        const cart = await CART.findOne({ author: user._id });

        if (!cart) {
            return error(res, "Savat topilmadi", 404);
        }

        return res.status(200).json(cart);
    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function quantity(req: typeof request, res: typeof response) {
    try {
        const user = req.user as { _id: string }

        let cart = await CART.findOne({ author: user._id })

        if (!cart) {
            return error(res, "Savat topilmadi", 404)
        }

        const item = cart.items.findIndex(p => p.product?._id.toString() === req.params.id?.toString())

        if (item === -1) {
            return error(res, "Savatda bunday mahsulot yo'q")
        }

        if (cart.items[item]) {

            const items = cart.items[item]

            if (req.body.type === "+") {
                items.quantity = (items.quantity || 0) + 1
                items.totalPrice = items.product.price * items.quantity
                await cart.save()
                return res.status(200).json(items)
            } else if (req.body.type === "-") {
                if (items.quantity > 1) {
                    items.quantity -= 1
                    items.totalPrice = items.product.price * items.quantity
                }

                await cart.save()
                return res.status(200).json(items)
            }
        }

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function selectToggle(req: typeof request, res: typeof response) {
    try {
        const user = req.user as { _id: string }
        const cartId = req.params.id

        const carts = await CART.findOne({ author: user._id })

        if (!carts) {
            return error(res, "Savat topilmadi", 404)
        }

        const cart = carts.items.findIndex(c => c._id.toString() === cartId?.toString())

        if (cart === -1) {
            return error(res, "Savatda bunday mahsulot yo'q")
        }

        if (carts.items[cart]) {
            const isSelected = carts.items[cart]?.select

            const items = carts.items[cart]

            if (!isSelected) {
                items.select = true
                await carts.save()
                return res.status(200).json({ message: "Mahsulot tanlandi", items })
            } else if (isSelected) {
                items.select = false
                await carts.save()
                return res.status(200).json({ message: "Mahsulot tanlovadan olindi", items })
            }

        }

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}