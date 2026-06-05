import app from "./app.js";
import { redis } from "./config/redis.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
    await redis.connect();

    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec)
    );

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
  }

startServer();