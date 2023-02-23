const bcrypt = require("bcrypt");
var validator = require("validator");
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";
const { client } = require("../connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  const user_id = validator.escape(req.body.user_id);
  const device_id = validator.escape(req.body.dev_id);

  try {
    let add_dev = await client.query(
      `INSERT INTO "groupproject"."device" ("id", "user") VALUES ('${device_id}', '${user_id}');`
    );

    console.log(add_dev);

    await req.session.save();
    await res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    await res.status(200).json({ ok: false });
  }
}
