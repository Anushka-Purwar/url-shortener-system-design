import express from "express";
import urlRouter from "./routes/url.routes";
import { healthCheck } from "./controllers/url.controller";

const app = express();

app.use(express.json());

app.use("/url", urlRouter);

export default app;