import express, { CookieOptions, Request, Response } from "express";
import {
  login,
  logout,
  register,
  verifyRefreshToken,
} from "./auth.controller.js";
import { catchAsync } from "../../lib/catch-async.js";
import { generateTokens } from "../../lib/generate-tokens.js";
import { cookieOptions } from "../../config/auth.config.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

authRouter.post(
  "/refresh",
  verifyRefreshToken,
  catchAsync(async (req: Request, res: Response) => {
    const { userId } = res.locals.user;
    const { accessToken, refreshToken } = await generateTokens({
      userId,
    });

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, cookieOptions as CookieOptions)
      .json({
        status: "success",
        message: "Token refreshed successfully",
        data: { accessToken },
      });
  })
);

export default authRouter;
