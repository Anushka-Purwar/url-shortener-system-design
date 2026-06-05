import { Router } from "express";
import { createShortUrl, deleteUrl, fetchAnalyticController, updateExpiration } from "../controllers/url.controller";
import { healthCheck } from "../controllers/url.controller";
import { redirect } from "../controllers/url.controller";
import { findStats } from "../controllers/url.controller";
import {updateStatus} from "../controllers/url.controller";

const router = Router();


router.post("/create", createShortUrl);
router.get("/healthCheck", healthCheck);
router.get("/:shortCode",redirect);
router.get("/stats/:shortCode",findStats);
router.patch("/updateExpiryDate/:shortCode", updateExpiration);
router.patch("/linkStatus/:shortCode", updateStatus);
router.patch("/deleteUrl/:shortCode", deleteUrl);
router.get("/fetchAnalytics/:shortCode", fetchAnalyticController);

export default router;