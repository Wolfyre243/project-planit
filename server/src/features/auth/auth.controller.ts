import { CookieOptions, NextFunction, Request, Response } from "express";
import { createUser, getUserByEmail, getUserById } from "../user/user.model.js";
import bcrypt from "bcrypt";
import { generateTokens } from "../../lib/generate-tokens.js";
import { cookieOptions } from "../../config/auth.config.js";
import { catchAsync } from "../../lib/catch-async.js";
import { APIError } from "../../types/error.types.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { formatDistanceToNowStrict } from "date-fns";

export const register = catchAsync(async (req: Request, res: Response) => {
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

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await getUserByEmail({ email });

  if (!user) {
    throw new APIError("Invalid credentials", 401);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new APIError("Invalid credentials", 401);
  }

  const { accessToken, refreshToken } = await generateTokens({
    userId: user.userId,
  });

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions as CookieOptions)
    .json({
      status: "success",
      message: "User logged in successfully",
      data: { accessToken },
    });
});

export const verifyRefreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw new APIError("No refresh token provided", 400);
    }

    try {
      const payload = jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET!
      ) as JwtPayload;
      console.log(
        `🕐 Refresh token expires in ${formatDistanceToNowStrict(
          new Date((payload.exp as number) * 1000)
        )}`
      );

      // Find user in DB
      const user = await getUserById({ userId: payload.id });
      res.locals.user = user;

      console.log(
        `✅ Successfully verified refresh token for userId: ${payload.id}`
      );
      
      return next();
    } catch (error) {
      console.error("JWT verification failed", { error });
      throw new APIError("Invalid or expired token", 401);
    }
  }
);

export const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", cookieOptions as CookieOptions);
  res.sendStatus(204);
});
