import { request, response } from "express";
import PRODUCT from "../../../models/product.model.ts";
import error from "../../../errors/error.ts";
import jwt from "../../../plugins/jwt.ts";
import RECENTS from "../../../models/recent.model.ts";
import AUTH from "../../../models/user.model.ts";
import FAVOURITE from "../../../models/favourite.model.ts";
import mongoose from "mongoose";

export async function allProducts(req: typeof request, res: typeof response) {
    try {
        const allProducts = await PRODUCT.find({})

        if (allProducts.length < 1) {
            return error(res, "Birorta ham mahsulot yo'q", 404)
        }

        return res.status(200).json(allProducts)

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function getOne(req: typeof request, res: typeof response) {
    try {
        const product = await PRODUCT.findById(req.params.id)
        if (!product) return error(res, "Bu borada hech qanday mahsulot yo‘q", 404)

        const token = req.cookies["amazon_clone"]
        if (token) {
            const decode = jwt("verify", token) as { id: string }

            let recent = await RECENTS.findOne({ recentId: new mongoose.Types.ObjectId(decode.id) })
            if (recent) {
                if (!recent.recents.includes(product._id)) {
                    recent.recents.unshift(product)
                    if (recent.recents.length > 20) recent.recents.pop()
                    recent.markModified("recents")
                    await recent.save()
                }
            } else {
                await RECENTS.create({
                    recentId: decode.id,
                    recents: product,
                })
            }
        }

        product.views += 1
        await product.save()

        return res.status(200).json(product)
    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function addFav(req: typeof request, res: typeof response) {
    try {
        if (!req.user) {
            return error(res, "Avval ro'yxatdan o'ting", 401);
        }

        const userId = (req.user as { _id: string })._id;

        const user = await AUTH.findById(userId);
        if (!user) {
            return error(res, "Avval ro'yxatdan o'ting", 401);
        }

        const product = await PRODUCT.findById(req.params.id);
        if (!product) {
            return error(res, "Hech qanday mahsulot topilmadi", 404);
        }

        let fav = await FAVOURITE.findOne({ userId });
        if (!fav) {
            fav = await FAVOURITE.create({ userId, favs: [product] });
            return res.status(201).json({ message: "Mahsulot sevimlilarga qo'shildi", fav });
        }

        const index = fav.favs.findIndex(f => f._id.toString() === req.params.id);

        if (index === -1) {
            fav.favs.push(product);
            await fav.save();
            return res.status(200).json({ message: "Mahsulot sevimlilarga qo'shildi", fav });
        } else {
            fav.favs = fav.favs.filter(f => f._id.toString() !== req.params.id);
            await fav.save();
            return res.status(200).json({ message: "Mahsulot sevimlilardan o'chirildi", fav });
        }

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function getAllFavs(req: typeof request, res: typeof response) {
    try {
        const user = req.user as { _id: string }

        const favs = await FAVOURITE.findOne({ userId: user._id })

        return res.status(200).json(favs)

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function likeUnlike(req: typeof request, res: typeof response) {
    try {
        const user = req.user as { _id: string }

        if (!user) {
            return error(res, "Avval ro'yxatdan o'ting", 401)
        }

        let product = await PRODUCT.findById(req.params.id)

        if (!product) {
            return error(res, "Mahsulot topilmadi", 404)
        }

        const index = product.likes.findIndex(like => like.toString() === user._id.toString());

        if (index === -1) {
            product.likes.push(user._id);
            await product.save();
            return res.status(200).json({ message: "Like bosildi ✅", likes: product.likes.length });
        } else {
            product.likes = product.likes.filter(like => like.toString() !== user._id.toString());
            await product.save();
            return res.status(200).json({ message: "Like olib tashlandi ❌", likes: product.likes.length });
        }

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function searchProduct(req: typeof request, res: typeof response) {
    try {
        const query = req.query.name as string

        const product = await PRODUCT.find({
            name: { $regex: query, $options: "i" }
        });

        if (product.length === 0) {
            return error(res, "Bunday mahsulot yo'q bizda")
        }

        return res.status(200).json(product)

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}