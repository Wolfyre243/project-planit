import { Response, Request, NextFunction } from "express";
import { catchAsync } from "../lib/catch-async.js";
import { APIError } from "../types/error.types.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { formatDistanceToNowStrict } from "date-fns";

export const verifyJWT = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new APIError("Unauthorized", 401);
    }
    const secret = process.env.AUTH_JWT_SECRET!;

    try {
      const payload = jwt.verify(token, secret) as JwtPayload;
      console.log(
        `🕐 Access token expires in ${formatDistanceToNowStrict(
          new Date((payload.exp as number) * 1000)
        )}`
      );

      res.locals.user = {
        id: payload.id,
      };

      console.log(
        `✅ Access token successfully verified for userId: ${res.locals.user.id}`
      );

      return next();
    } catch (error) {
      console.error("JWT verification failed", { error });
      throw new APIError("Invalid or expired token", 401);
    }
  }
);
