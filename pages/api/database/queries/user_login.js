import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";
const bcrypt = require("bcrypt");
var validator = require("validator");
const { client } = require("../connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  const username = validator.escape(req.body.username);
  const pass = validator.escape(req.body.password);
  let rows_user = null;
  try {
    rows_user = await client.query(
      `SELECT * FROM "groupproject"."user" WHERE username = '${username}' LIMIT 1;`
    );

    const user = rows_user.rows[0];

    let result = bcrypt.compareSync(pass, rows_user.rows[0].password);

    if (result) {
      req.session.user = {
        user_id: user.user_ID,
        user_name: user.username,
        user_email: user.email,
        user_userSince: user.dateCreated,
      };

      const rows_devices = await client.query(
        `SELECT * FROM "groupproject"."device" where "user" = '${user.user_ID}' ;`
      );

      req.session.devices = {
        devices: rows_devices.rows[0].id,
      };

      await req.session.save();
      await res.send({ ok: true, user: req.session.user });
    } else {
      await res.status(200).json({ ok: false });
    }
  } catch (error) {
    await res.status(200).json({ ok: false });
  }
}
