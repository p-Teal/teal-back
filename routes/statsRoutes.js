import express from "express";
const router = express.Router();

import { getStats } from "../controllers/statsController.js";

router.route("/getStats").get(getStats);

export default router;
