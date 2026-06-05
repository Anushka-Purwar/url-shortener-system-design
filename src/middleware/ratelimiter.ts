import rateLimit from "express-rate-limit";

export const createUrlLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 100,

    message: {
        message: "Too many URL creation requests. Please try again later.",
    },

    standardHeaders: true,
    legacyHeaders: false,
});

export const getUrlLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 1000,

    message: {
        message: "Too many URL requests. Please try again later.",
    },

    standardHeaders: true,
    legacyHeaders: false,
});

export const getAnalyticsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 10000,

    message: {
        message: "Too many URL requests. Please try again later.",
    },

    standardHeaders: true,
    legacyHeaders: false,
});