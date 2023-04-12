const bcrypt = require("bcrypt");
var validator = require("validator");
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";
const { pool, client } = require("../connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {

  let rows_user = null;
  let msg = "";

  let username = validator.escape(req.body.username_Reg);
  let email = validator.escape(req.body.email_Reg);
  let pass = validator.escape(req.body.password_Reg);

  const hash = bcrypt.hashSync(pass, 5);

  const chars_blacklist = "{ ;#%/=?`:|&$}+-";

  username = validator.blacklist(username, chars_blacklist);
  pass = validator.blacklist(pass, chars_blacklist);
  email = validator.blacklist(email, chars_blacklist);

  if (validator.isLength(username, { min: 6, max: 20 })) {
    msg = `Username lentght must be between 6 and 20 characters`;
  } else if (validator.isLength(pass, { min: 6, max: 20 })) {
    msg = `Password lentght must be between 6 and 20 characters`;
  } else if (validator.isLength(username, { min: 5, max: 30 })) {
    msg = `Email lentght must be between 5 and 20 characters`;
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
      // error 23505 indicated dublicate primary key which in this case is username or email
      if (error.code == 23505) {
        console.log(error);
        msg = `Username in use`;
      }

      await res.status(200).json({ ok: false, message: msg });
      return;
    }
  }
  await res.status(200).json({ ok: false, message: msg });
}
