import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";
const bcrypt = require("bcrypt");
var validator = require("validator");
const { client } = require("../connections/connection");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  const username = validator.escape(req.body.username);
  const pass = validator.escape(req.body.password);

  const rows_user = await client.query(
    `SELECT * FROM "groupproject"."user" WHERE username = '${username}' LIMIT 1;`
  );

  const user = rows_user[0];

  let result = bcrypt.compareSync(pass, rows_user.rows[0].password);
  console.log(result);
  if (result) {
    req.session.user = {
      user_id: user.id,
      user_name: user.username,
      user_email: user.email,
      user_userSince: user.dateCreated,
    };

    const [rows_devices] = await connection.execute(
      `SELECT * FROM devices WHERE userID = ? ;`,
      [user.id]
    );

    req.session.devices = {
      devices: rows_devices,
    };
    // await res.send(req.session);
    await req.session.save();
    await res.send({ ok: true, user: req.session.user });
  } else {
    await res.send({ ok: false });
  }
}
