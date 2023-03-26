export const ironOptions = {
  cookieName: "MonTool_cookie",
  password: "7IkDqh^Ks4z@&wZK1qm8f0DZIEbcAY1MkDR", //process.env.SESSION_KEY,

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    // domain: "montool.vercel.app",
    maxAge: (ttl === 0 ? 2147483647 : ttl) - 60,
  },
};
