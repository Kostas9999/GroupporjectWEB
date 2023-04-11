const bcrypt = require("bcrypt");
var validator = require("validator");
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";
const { pool, client } = require("../connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  let username = validator.escape(req.body.username_Reg);
  let email = validator.escape(req.body.email_Reg);
  let pass = validator.escape(req.body.password_Reg);

  const hash = bcrypt.hashSync(pass, 5);
  let rows_user = null;
  let msg = "";

  const chars_blacklist = "{ ;#%/=?`:|&$}+-";

  username = validator.blacklist(username, chars_blacklist);
  pass = validator.blacklist(pass, chars_blacklist);
  email = validator.blacklist(email, chars_blacklist);

  if (username.length < 6) {
    msg = `Username is to short: ${username.length} characters only`;
  } else if (pass.length < 6) {
    msg = `Password is to short: ${pass.length} characters only`;
  } else if (email.length < 5) {
    msg = `Email is to short: ${email.length} characters only`;
  } else if (username.length > 20) {
    msg = `Username is to long: ${pass.length} characters`;
  } else if (pass.length > 20) {
    msg = `Password is to long: ${pass.length} characters`;
  } else if (email.length > 30) {
    msg = `Email is to long: ${email.length} characters`;
  } else if (!validator.isEmail(email)) {
    msg = `Email is invalid`;
  } else if (
    !validator.isAscii(username) ||
    !validator.isAscii(pass) ||
    !validator.isAscii(email)
  ) {
    msg = `Your username, email or password contains unsuported characters`;
  } else {
    try {
      rows_user = await pool.query(
        `INSERT INTO "groupproject"."user" (username, email, password) VALUES ('${username}', '${email}', '${hash}') RETURNING user_id;`
      );

      console.log(rows_user.rows[0].user_id);

      req.session.user = {
        user_id: rows_user.rows[0].user_id,
        user_name: username,
        user_email: email,
      };
      req.session.devices = {
        devices: null,
      };

      await req.session.save();
      await res.status(200).json({ ok: true, user: req.session.user });
      return;
    } catch (error) {
      // error 23505 indicated dublicate primary key which in this case is username
      if (error.code == 23505) {
        msg = `Username in use`;
      }

      await res.status(200).json({ ok: false, message: msg });
      return;
    }
  }
  await res.status(200).json({ ok: false, message: msg });
}
