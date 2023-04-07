import express from "express";
const router = express.Router();

import {
  getAnimais,
  createAnimal,
} from "../controllers/animalController.js";

router.route("/getAnimais").get(getAnimais);
router.route("/createAnimal").post(createAnimal);

export default router;