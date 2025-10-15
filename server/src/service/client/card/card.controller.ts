import { request, response } from "express";
import error from "../../../errors/error.ts";
import CARD from "../../../models/card.model.ts";

export async function addCard(req: typeof request, res: typeof response) {
    try {
        const user = req.user as { _id: string };

        let card = await CARD.findOne({ author: user._id });

        if (!card) {
            card = await CARD.create({ author: user._id, cards: [] });
        }

        if (card.cards.length >= 3) {
            return error(res, "3 tadan oshiq karta qo'sha olmaysiz");
        }

        const hasCard = card.cards.some(
            (c) => c.cardNumber === Number(req.body.cardNumber)
        );

        if (hasCard) {
            return error(res, "Sizda allaqachon bunday hisob raqam bor");
        }

        card.cards.push({
            cardNumber: Number(req.body.cardNumber),
        });

        await card.save();

        return res.status(200).json({
            message: "Karta muvaffaqiyatli qo'shildi ✅",
            card,
        });
    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function cards(req: typeof request, res: typeof response) {
    try {
        const cards = await CARD.findOne({ author: (req.user as { _id: string })._id })

        if (!cards) {
            return error(res, "Sizda hech qanday karta yo'q")
        }

        return res.status(200).json(cards)
    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function oneCard(req: typeof request, res: typeof response) {
    try {
        const cards = await CARD.findOne({ author: (req.user as { _id: string })._id })

        if (!cards) {
            return error(res, "Sizda hech qanday karta yo'q")
        }

        const card = cards.cards.findIndex(c => c._id.toString() === req.params.id?.toString())

        if (card === -1) {
            return error(res, "Bunday karta yo'q")
        }

        return res.status(200).json(cards.cards[card])

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function updateCard(req: typeof request, res: typeof response) {
    try {
        const cards = await CARD.findOne({ author: (req.user as { _id: string })._id })

        if (!cards) {
            return error(res, "Sizda hech qanday karta yo'q")
        }

        const card = cards.cards.findIndex(c => c._id.toString() === req.params.id?.toString())

        if (card === -1) {
            return error(res, "Bunday karta yo'q")
        }

        const hasCard = cards.cards.some(
            (c) => c.cardNumber === Number(req.body.cardNumber)
        );

        if (hasCard) {
            return error(res, "Sizda bunday karta allaqachon bor")
        }

        if (cards.cards[card]) {
            cards.cards[card].cardNumber = Number(req.body.cardNumber);
        }

        await cards.save()

        return res.status(200).json(cards.cards[card])

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}

export async function deleteCard(req: typeof request, res: typeof response) {
    try {
        const cards = await CARD.findOne({ author: (req.user as { _id: string })._id })

        if (!cards) {
            return error(res, "Sizda hech qanday karta yo'q")
        }

        const card = cards.cards.findIndex(c => c._id.toString() === req.params.id?.toString())

        if (card === -1) {
            return error(res, "Bunday karta yo'q")
        }

        cards.cards.splice(card, 1)

        await cards.save()

        return res.status(200).json({ message: "Kartanggizni o'chirdinggiz" })

    } catch (err) {
        return error(res, (err as Error).message, 500);
    }
}