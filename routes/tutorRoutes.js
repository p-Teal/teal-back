import express from "express";
const router = express.Router();

import {
  getTutores,
  createTutor,
  deleteTutor,
  getTutor,
  updateTutor,
} from "../controllers/tutorController.js";

router.route("/getTutores").get(getTutores);
router.route("/createTutor").post(createTutor);
router.route("/deleteTutor/:id").delete(deleteTutor);
router.route("/getTutor/:id").get(getTutor);
router.route("/updateTutor/:id").put(updateTutor);

export default router;
