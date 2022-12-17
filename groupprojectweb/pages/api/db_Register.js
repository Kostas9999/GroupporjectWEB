const bcrypt = require("bcrypt");
var validator = require("validator");
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./session/session_Config";
const mysql = require("mysql2/promise");
export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  const username = validator.escape(req.body.username_Reg);
  const email = validator.escape(req.body.email_Reg);
  const pass = validator.escape(req.body.password_Reg);

  // create the connection to database
  const connection = await mysql.createConnection({
    host: "185.38.61.93",
    user: "MGproject",
    password: "F37E28sINiKukaNegu4uzIDu3I7iXe",
    port: 3306,
    database: "groupproject",
  });

  const hash = bcrypt.hashSync(pass, 13);

  const [rows_user] = await connection.execute(
    `INSERT INTO users (username, email, pass) VALUES (?, ?, ?);`,
    [username, email, hash]
  );
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
