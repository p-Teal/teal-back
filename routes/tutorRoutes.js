import express from "express";
const router = express.Router();

import {
  getTutores,
  createTutor,
  deleteTutor,
} from "../controllers/tutorController.js";

router.route("/getTutores").get(getTutores);
router.route("/createTutor").post(createTutor);
router.route("/deleteTutor/:id").delete(deleteTutor);

export default router;
