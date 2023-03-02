export const ironOptions = {
  cookieName: "MonTool_cookie",
  password:
    "sfdfsdfsdfsdfsfdfsddfsdfsdfsdfsfdfsddfsdfsdfsdfsfdfsddfsdfsdfsdfsfdfsdf", //process.env.SESSION_KEY,

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    domain: montool.vercel.app,
    maxAge: undefined,
  },
};
