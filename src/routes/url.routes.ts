import { Router } from "express";
import { createShortUrl, deleteUrl, fetchAnalyticController, updateExpiration } from "../controllers/url.controller";
import { healthCheck } from "../controllers/url.controller";
import { redirect } from "../controllers/url.controller";
import { findStats } from "../controllers/url.controller";
import {updateStatus} from "../controllers/url.controller";
import { createUrlLimiter, getAnalyticsLimiter, getUrlLimiter } from "../middleware/ratelimiter";

const router = Router();


router.post("/create",createUrlLimiter, createShortUrl);
router.get("/healthCheck", healthCheck);
router.get("/:shortCode",getUrlLimiter,redirect);
router.get("/stats/:shortCode",findStats);
router.patch("/updateExpiryDate/:shortCode", getUrlLimiter, updateExpiration);
router.patch("/linkStatus/:shortCode", getUrlLimiter, updateStatus);
router.patch("/deleteUrl/:shortCode",getUrlLimiter, deleteUrl);
router.get("/fetchAnalytics/:shortCode", getAnalyticsLimiter, fetchAnalyticController);

export default router;