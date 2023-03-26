import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  updateVoluntario,
  getVoluntario,
  ativarVoluntario,
  desativarVoluntario,
  getVoluntarios,
} from "../controllers/authController.js";
import auth from "../middleware/auth-middle.js";

router.route("/registro").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/updateVoluntario").patch(auth, updateVoluntario);
router.route("/getVoluntario").get(auth, getVoluntario);
router.route("/ativarVoluntario/:cpf").get(ativarVoluntario);
router.route("/desativarVoluntario/:cpf").get(desativarVoluntario);
router.route("/getVoluntarios").get(getVoluntarios);

export default router;
