import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connect } from "mongoose";

import authRouter from "./routes/authRoutes.js";

// middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorMiddleware from "./middleware/error-middle.js";

const app = express();
dotenv.config();

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.json({ mensagem: "API V1" });
});

app.use("/api/v1/voluntario", authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const serverStart = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  } catch (error) {
    console.log(error);
  }
};

serverStart();
