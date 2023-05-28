import express from "express";
const router = express.Router();

import {
  createAdocao,
  getAdocoes,
  cancelarAdocao,
  apagarAdocao,
  getAnimaisDisponiveis,
  getTutorAprovadoByCpf,
} from "../controllers/adocaoController.js";

router.route("/createAdocao").post(createAdocao);
router.route("/getAdocoes").get(getAdocoes);
router.route("/cancelarAdocao/:id").put(cancelarAdocao);
router.route("/apagarAdocao/:id").delete(apagarAdocao);
router.route("/getAnimaisDisponiveis").get(getAnimaisDisponiveis);
router.route("/getTutorAprovadoByCpf/:cpf").get(getTutorAprovadoByCpf);

export default router;
