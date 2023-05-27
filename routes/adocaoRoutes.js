import express from "express";
const router = express.Router();

import {
  createAdocao,
  getAdocoes,
  cancelarAdocao,
  apagarAdocao,
} from "../controllers/adocaoController.js";

router.route("/createAdocao").post(createAdocao);
router.route("/getAdocoes").get(getAdocoes);
router.route("/cancelarAdocao/:id").put(cancelarAdocao);
router.route("/apagarAdocao/:id").delete(apagarAdocao);

export default router;
