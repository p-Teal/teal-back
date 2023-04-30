import express from "express";
const router = express.Router();

import {
  getAnimais,
  createAnimal,
  getAnimal,
} from "../controllers/animalController.js";

router.route("/getAnimais").get(getAnimais);
router.route("/createAnimal").post(createAnimal);
router.route("/getAnimal/:id").get(getAnimal);

export default router;