import { Router } from "express";
import { createShortUrl } from "../controllers/url.controller";
import { healthCheck } from "../controllers/url.controller";
import { redirect } from "../controllers/url.controller";

const router = Router();


router.post("/create", createShortUrl);
router.get("/healthCheck", healthCheck);
router.get("/:shortCode",redirect);

export default router;