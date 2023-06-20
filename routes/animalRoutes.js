import express from "express";
const router = express.Router();

import {
  getAnimais,
  createAnimal,
  getAnimal,
  updateFoto,
  updateAnimal,
  deleteAnimal
} from "../controllers/animalController.js";

router.route("/getAnimais").get(getAnimais);
router.route("/createAnimal").post(createAnimal);
router.route("/getAnimal/:id").get(getAnimal);
router.route("/updateFoto/:id").patch(updateFoto);
router.route("/updateAnimal/:id").patch(updateAnimal);
router.route("/deleteAnimal/:id").delete(deleteAnimal);

export default router;
