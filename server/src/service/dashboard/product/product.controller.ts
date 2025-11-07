import { request, response } from "express";
import error from "../../../errors/error.ts";
import CATEGORY from "../../../models/category.model.ts";
import PRODUCT from "../../../models/product.model.ts";

export async function createProduct(req: typeof request, res: typeof response) {
    try {
        const { name, price, desc, category, image, isDiscount, discount, hasVariants, variants } = req.body;

        if (!name || !price || !desc || !category || !image) {
            return error(res, "Ma'lumotlar to'liq emas");
        }

        if (!category.name || !category.icon || !category.desc) {
            return error(res, "Siz kategoriyani noto'g'ri formatda berdingiz");
        }

        if (hasVariants && !variants) {
            return error(res, "Variant bermadinggiz", 400)
        }

        const newProduct = await PRODUCT.create({
            name,
            price,
            desc,
            image,
            isDiscount: !!isDiscount,
            discount: isDiscount ? discount : undefined,
            hasVariants: hasVariants,
            variants: hasVariants ? variants : undefined,
        });

        let categoryDoc = await CATEGORY.findOne({ name: category.name });
        if (!categoryDoc) {
            categoryDoc = await CATEGORY.create({
                name: category.name,
                desc: category.desc,
                icon: category.icon,
                productId: [newProduct._id],
            });
        } else {
            categoryDoc.productId.push(newProduct._id);
            await categoryDoc.save();
        }

        return res.status(200).json({ message: "Yangi mahsulot yaratildi", newProduct });

    } catch (err) {
        return error(res, (err as Error).message);
    }
}

export async function updateProduct(req: typeof request, res: typeof response) {
    try {
        const productId = req.params.id

        const product = await PRODUCT.findById(productId)

        if (!product) {
            return error(res, "Mahsulot topilmadi", 404)
        }

        let category

        if (req.body.category) {
            category = await CATEGORY.findOne({ productId: product.id })

            if (!category) {
                return error(res, "Categoriyalar aniqlanmadi", 404)
            }
        }

        await PRODUCT.findByIdAndUpdate(productId, { ...req.body }, { new: true })

        if (category) {
            await CATEGORY.findOneAndUpdate({ productId }, { ...req.body.category }, { new: true })
        }

        return res.status(200).json({ message: "Mahsulot yangilandi", product, category })

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}

export async function deleteProduct(req: typeof request, res: typeof response) {
    try {

        const { ids } = req.body
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "O'chirish uchun IDlar topilmadi" })
        }

        const products = await PRODUCT.find({ _id: { $in: ids } })

        if (products.length === 0) {
            return res.status(404).json({ message: "Mahsulot topilmadi" })
        }

        await PRODUCT.deleteMany({ _id: { $in: ids } })
        await CATEGORY.deleteMany({ productId: { $in: ids } })

        return res.status(200).json({
            message: "Mahsulotlar o‘chirildi ✅",
            deletedCount: ids.length,
        })

    } catch (err) {
        return error(res, (err as Error).message, 500)
    }
}