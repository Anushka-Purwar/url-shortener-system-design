import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "URL Shortener API",
            version: "1.0.0",
            description: "A URL Shortener built with Express, Prisma, Redis, and PostgreSQL",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },

    apis: [ "src/routes/*.ts","src/docs/*.ts"],
});