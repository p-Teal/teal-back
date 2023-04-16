import express from "express";
const router = express.Router();

import {
  getDoacoes,
  createDoacao,
  desativarDoacao,
} from "../controllers/doacaoController.js";

router.route("/getDoacoes").get(getDoacoes);
router.route("/createDoacao").post(createDoacao);
router.route("/desativarDoacao/:id").post(desativarDoacao);

export default router;
