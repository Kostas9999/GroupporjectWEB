import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "./session/session_Config";
import Cookies from "js-cookie";
const bcrypt = require("bcrypt");

export default withIronSessionApiRoute(loginRoute, ironOptions);

async function loginRoute(req, res) {
  // Get just the username and password and put them into variables.
  const username = req.body.username;
  const pass = req.body.password;

  const mysql = require("mysql2/promise");

  // create the connection to database
  const connection = await mysql.createConnection({
    host: "185.38.61.93",
    user: "MGproject",
    password: "F37E28sINiKukaNegu4uzIDu3I7iXe",
    port: 3306,
    database: "groupproject",
  });

  let id = "";

  const [rows_user] = await connection.execute(
    `SELECT * FROM users WHERE username = ? LIMIT 1;`,
    [username]
  );

  const user = rows_user[0];
  /*
  bcrypt.hash("", 13, function (err, hash) {
    console.log(hash);
  });
*/

  let result = bcrypt.compareSync(pass, rows_user[0].pass);

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

  console.log(rows_devices);
  /*

    

            if (req.session.user.user_id > 0) {
              req.session.devices = {
                devices: results_devices,
              };

              await req.session.save();
            }

            await req.session.save();
            await res.status(200).json(req.session.user);
          }
        );
      }
    }
  );
*/
}
