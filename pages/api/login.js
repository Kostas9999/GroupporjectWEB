import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./session/session_Config";
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");
var validator = require("validator");
require("dotenv").config();

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  console.log(req);
  await res.send("in login");
  const username = validator.escape(req.body.username);
  const pass = validator.escape(req.body.password);

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  });

  const [rows_user] = await connection.execute(
    `SELECT * FROM users WHERE username = ? LIMIT 1;`,
    [username]
  );

  const user = rows_user[0];

  let result = bcrypt.compareSync(pass, rows_user[0].pass);
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
