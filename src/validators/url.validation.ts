import {z} from "zod";

export const validateUrl = z.object({
    originalUrl : z.url("Please provide a valid url"),
    customAlias : z.string().min(3).max(30).optional()
});