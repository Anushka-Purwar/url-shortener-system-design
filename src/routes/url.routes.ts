import { Router } from "express";
import { createShortUrl, deleteUrl, fetchAnalyticController, updateExpiration } from "../controllers/url.controller";
import { healthCheck } from "../controllers/url.controller";
import { redirect } from "../controllers/url.controller";
import { findStats } from "../controllers/url.controller";
import {updateStatus} from "../controllers/url.controller";
import { createUrlLimiter, getAnalyticsLimiter, getUrlLimiter } from "../middleware/ratelimiter";
import { RequestHandler } from "express";

const router = Router();


router.post("/create",createUrlLimiter, createShortUrl);
router.get("/healthCheck", healthCheck);
router.get("/:shortCode",getUrlLimiter,redirect as unknown as RequestHandler);
router.get("/stats/:shortCode",findStats);
router.patch("/updateExpiryDate/:shortCode", updateExpiration);
router.patch("/linkStatus/:shortCode", updateStatus);
router.patch("/deleteUrl/:shortCode", deleteUrl);
router.get("/fetchAnalytics/:shortCode", getAnalyticsLimiter, fetchAnalyticController as unknown as RequestHandler);

export default router;