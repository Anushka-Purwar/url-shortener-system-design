import app from "./app.js";
import { redis } from "./config/redis.js";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
    await redis.connect();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
  }

startServer();