import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";
const bcrypt = require("bcrypt");
var validator = require("validator");
const { client, pool } = require("../connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  const username = validator.escape(req.body.username);
  const pass = validator.escape(req.body.password);
  let rows_user = null;
  try {
    rows_user = await pool.query(
      `SELECT * FROM "groupproject"."user" WHERE username ILIKE '${username}' LIMIT 1;`
    );

    const user = rows_user.rows[0];

    let result = bcrypt.compareSync(pass, rows_user.rows[0].password);

    if (result) {
      req.session.user = {
        user_id: user.user_ID,
        user_name: user.username,
        user_email: user.email,
        user_userSince: user.dateCreated,
        user_api_key: user.api_key,
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
