import express from "express";
const router = express.Router();

import {
  getAnimais,
  createAnimal,
  getAnimal,
  updateFoto,
} from "../controllers/animalController.js";

router.route("/getAnimais").get(getAnimais);
router.route("/createAnimal").post(createAnimal);
router.route("/getAnimal/:id").get(getAnimal);
router.route("/updateFoto/:id").patch(updateFoto);

export default router;