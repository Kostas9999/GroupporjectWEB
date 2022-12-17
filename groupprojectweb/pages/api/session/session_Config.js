export const ironOptions = {
  cookieName: "MoonTool_cookie",
  password: process.env.SESSION_KEY,

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
