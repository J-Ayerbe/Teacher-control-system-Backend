export const tokenCookieOptions = {
  maxAge: 2 * 60 * 1000, // 2min
  secure: process.env.NODE_ENV === "production",
};

export const refreshTokenCookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  secure: process.env.NODE_ENV === "production",
};
