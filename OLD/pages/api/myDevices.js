import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./session/session_Config";

export default withIronSessionApiRoute(function userRoute(req, res) {
  res.send({ user: req.session });
}, ironOptions);
