import { StatusCodes } from "http-status-codes";

export default (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    mensagem: err.message || "Erro interno do servidor",
  };

  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    // defaultError.msg = err.message;
    defaultError.mensagem = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.mensagem = `${Object.keys(err.keyValue)} já existe`;
  }

  res.status(defaultError.statusCode).json({
    mensagem: defaultError.mensagem,
  });
};
