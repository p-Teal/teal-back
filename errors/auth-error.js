import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error.js";

class AuthError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default AuthError;
