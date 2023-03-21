
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";
const { client } = require("../connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {

  let device_id = req.body.dev_id;
  let user_id = req.session.user.user_id;



  try {
    let add_dev = await client.query(
      `UPDATE "groupproject"."device" SET "user" = '0' WHERE "user" = '${user_id}' AND "id" = '${device_id}' ;`
    );

 

    await req.session.save();
    await res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    await res.status(200).json({ ok: false });
  }
}
