import { CookieOptions, Request, Response } from "express";
import { createUser } from "../user/user.model.js";
import bcrypt from "bcrypt";
import { generateTokens } from "../../lib/generate-tokens.js";
import { cookieOptions } from "../../config/auth.config.js";
import { catchAsync } from "../../lib/catch-async.js";

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const passwordHash = bcrypt.hashSync(
    password,
    parseInt(process.env.BCRYPT_SALTROUNDS!)
  );

  // Create user in the database
  const user = await createUser({ name, email, password: passwordHash });

  const { accessToken, refreshToken } = await generateTokens({
    userId: user.userId,
  });

  res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions as CookieOptions)
    .json({
      status: "ok",
      message: "User signed up successfully",
      data: {
        accessToken,
      },
    });
});
