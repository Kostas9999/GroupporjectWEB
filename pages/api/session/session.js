import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./session_Config";

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  // await res.status(200).json(req.session);

  await res.send(req.session);
}
