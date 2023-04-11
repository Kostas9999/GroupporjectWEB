const bcrypt = require("bcrypt");
var validator = require("validator");
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";
const { pool, client } = require("../connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  let msg = "";
  const user_id = validator.escape(req.body.user_id);
  const device_id = validator.escape(req.body.dev_id);

  if (validator.isUUID(device_id.replaceAll("_", "-"))) {
    try {
      let add_dev = await pool.query(
        `INSERT INTO "groupproject"."device" ("id", "user") VALUES ('${device_id}', '${user_id}') ON CONFLICT ("id") DO UPDATE SET "user" = '${user_id}' ;`
      );

      await req.session.save();
      await res.status(200).json({ ok: true });
    } catch (error) {
      console.log(error);
      await res.status(200).json({
        ok: false,
        message: "Error while adding device, please try again later",
      });
    }
  } else {
    await res.status(200).json({ ok: false, message: "Invalid UUID" });
  }
}
