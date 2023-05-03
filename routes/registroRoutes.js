import express from "express";
const router = express.Router();

import {
  createRegistro,
  deleteRegistro,
  getRegistrosByAnimalId,
} from "../controllers/registroController.js";

router.post("/createRegistro", createRegistro);
router.get("/getRegistros/:id", getRegistrosByAnimalId);
router.delete("/deleteRegistro/:id", deleteRegistro);

export default router;
