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
router.route("/ativarVoluntario/:cpf").post(auth, ativarVoluntario);
router.route("/desativarVoluntario/:cpf").post(auth, desativarVoluntario);
router.route("/getVoluntarios").get(auth, getVoluntarios);

export default router;
