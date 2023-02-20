const bcrypt = require("bcrypt");
var validator = require("validator");
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./pages/api/session/session_Config";
const client = require("./database/connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  const username = validator.escape(req.body.username_Reg);
  const email = validator.escape(req.body.email_Reg);
  const pass = validator.escape(req.body.password_Reg);

  const hash = bcrypt.hashSync(pass, 13);

  const rows_user = await client.query(
    `INSERT INTO "groupproject"."user" (username, email, password) VALUES (${username}, ${email}, ${hash});`
  );
  console.log(rows_user_reg);

  if (rows_user.insertId > 0) {
    req.session.user = {
      user_id: rows_user.insertId,
      user_name: username,
      user_email: email,
    };
    req.session.devices = {
      devices: null,
    };

    await req.session.save();
    await res.status(200).json({ ok: true, user: req.session.user });
  } else {
    await res.status(200).json({ ok: false });
  }
}
