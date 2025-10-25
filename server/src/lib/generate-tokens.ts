import jwt from 'jsonwebtoken';

const AUTH_JWT_SECRET = process.env.AUTH_JWT_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const AUTH_JWT_EXPIRES_IN = process.env.AUTH_JWT_EXPIRES_IN!;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN!;

export const generateTokens = async ({
  userId,
}: {
  userId: string;
}) => {
  // @ts-expect-error I'm not importing ms.StringValue
  const accessToken = jwt.sign(
    { id: userId },
    AUTH_JWT_SECRET!,
    { expiresIn: AUTH_JWT_EXPIRES_IN }
  );
  // @ts-expect-error I'm not importing ms.StringValue
  const refreshToken = jwt.sign(
    { id: userId },
    REFRESH_TOKEN_SECRET!,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
  );

  return { accessToken, refreshToken };
};
