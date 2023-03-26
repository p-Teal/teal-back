import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error.js";

class BadReqError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadReqError;
