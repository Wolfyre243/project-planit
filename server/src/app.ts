import express, { Response, Request } from "express";
import "dotenv/config";
import authRouter from "./features/auth/auth.route.js";
import cookieParser from "cookie-parser";
import { cookieOptions } from "./config/auth.config.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(cookieParser(undefined, cookieOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Server is online",
  });
});

app.use("/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT}!`);
});
