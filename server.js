import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connect } from "mongoose";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";

import authRouter from "./routes/authRoutes.js";
import animalRouter from "./routes/animalRoutes.js";
import doacaoRouter from "./routes/doacaoRoutes.js";
import tutorRouter from "./routes/tutorRoutes.js";
import registroRouter from "./routes/registroRoutes.js";
import adococaoRouter from "./routes/adocaoRoutes.js";
import statsRouter from "./routes/statsRoutes.js";

// middlewares
import notFoundMiddleware from "./middleware/not-found.js";
import errorMiddleware from "./middleware/error-middle.js";
import auth from "./middleware/auth-middle.js";

const app = express();
dotenv.config();

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL, "https://teal-ong.vercel.app", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL,
      "https://teal-ong.vercel.app",
      "http://localhost:3001"
    ],
    credentials: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get("/api/v1", (req, res) => {
  res.json({ mensagem: "ONG API" });
});

app.use("/api/v1/voluntario", authRouter);
app.use("/api/v1/animal", auth, animalRouter);
app.use("/api/v1/doacao", auth, doacaoRouter);
app.use("/api/v1/tutor", auth, tutorRouter);
app.use("/api/v1/registro", auth, registroRouter);
app.use("/api/v1/adocao", auth, adococaoRouter);
app.use("/api/v1/stats", auth, statsRouter);

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
