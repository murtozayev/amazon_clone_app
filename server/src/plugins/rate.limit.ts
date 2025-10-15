import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Siz juda ko'p so'rov yubordinggiz",
    },
    standardHeaders: true,
    legacyHeaders: true
})

export default limiter