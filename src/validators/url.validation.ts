import {z} from "zod";

export const validateUrl = z.object({
    originalUrl : z.url("Please provide a valid url"),
    customAlias : z.string().min(3).max(30).optional(),
    expiresAt: z.string().datetime().optional()
});

export const updateExpirationSchema = z.object({
    shortCode : z.string().min(1),
    expiresAt: z.string().datetime()
}).refine(
    (data) => new Date(data.expiresAt) > new Date(),
    {
        message: "Expiration date must be in the future",
        path: ["expiresAt"],
    }
);

export const validateActiveBool = z.object({
    shortCode : z.string().min(1),
    isActive : z.boolean()
})

export const validateDeletedAt = z.object({
    shortCode : z.string().min(1),
    deletedAt: z.string().datetime()
})