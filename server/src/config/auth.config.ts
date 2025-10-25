import { CookieParseOptions } from "cookie-parser";

export const cookieOptions = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: parseInt(process.env.COOKIE_MAXAGE as string),
} as CookieParseOptions;