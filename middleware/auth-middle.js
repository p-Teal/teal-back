import jwt from "jsonwebtoken";
import { AuthError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AuthError("Autenticação necessária");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.voluntario = payload.voluntarioId;
    next();
  } catch (error) {
    throw new AuthError("Autenticação necessária");
  }
};

export default auth;
