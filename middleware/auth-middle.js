import jwt from "jsonwebtoken";
import { AuthError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new AuthError("Autenticação necessária");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload, 'payload');
    req.voluntario = { voluntarioId: payload.voluntarioId };
    req.admin = payload.admin;
    req.ativo = payload.ativo;

    if (!req.ativo) {
      throw new AuthError("Conta inativa");
    }
    next();
  } catch (error) {
    throw new AuthError("Autenticação necessária");
  }
};

export default auth;
