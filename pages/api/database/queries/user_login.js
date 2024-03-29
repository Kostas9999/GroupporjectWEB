import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";
const bcrypt = require("bcrypt");
var validator = require("validator");
const { client, pool } = require("../connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  let msg = "";

  const chars_blacklist = "{ ;#%/=?`:|&$}+-";
  let username = validator.escape(req.body.username);
  let pass = validator.escape(req.body.password);

  username = validator.blacklist(username, chars_blacklist);
  pass = validator.blacklist(pass, chars_blacklist);
  console.log(validator.isLength(username, { min: 6, max: 20 }));

  if (!validator.isLength(username, { min: 6, max: 20 })) {
    msg = `Username lentght must be between 6 and 20 characters`;
  } else if (!validator.isLength(pass, { min: 6, max: 20 })) {
    msg = `Password lentght must be between 6 and 20 characters`;
  } else if (!validator.isAscii(username) || !validator.isAscii(pass)) {
    msg = `Your username or password contains unsuported characters`;
  } else {
    let rows_user = null;
    try {
      rows_user = await pool.query(
        `SELECT * FROM "groupproject"."user" WHERE username ILIKE '${username}' LIMIT 1;`
      );

      const user = rows_user.rows[0];

      let result = bcrypt.compareSync(pass, rows_user.rows[0].password);

      if (result) {
        req.session.user = {
          user_id: user.user_id,
          user_name: user.username,
          user_email: user.email,
          user_userSince: user.dateCreated,
          user_api_key: user.api_key,
        };

        await req.session.save();

        await res.send({ ok: true, user: req.session.user });
      } else {
        await res
          .status(200)
          .json({ ok: false, message: "Username or Password is incorrect" });
      }
    } catch (error) {
      await res
        .status(200)
        .json({ ok: false, message: "Username or Password is incorrect" });
    }
    return;
  }
  await res.status(200).json({ ok: false, message: msg });
}
