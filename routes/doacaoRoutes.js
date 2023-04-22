import express from "express";
const router = express.Router();

import {
  getDoacoes,
  createDoacao,
  desativarDoacao,
  deleteDoacao,
} from "../controllers/doacaoController.js";

router.route("/getDoacoes").get(getDoacoes);
router.route("/createDoacao").post(createDoacao);
router.route("/desativarDoacao/:id").post(desativarDoacao);
router.route("/deleteDoacao/:id").delete(deleteDoacao);

export default router;
