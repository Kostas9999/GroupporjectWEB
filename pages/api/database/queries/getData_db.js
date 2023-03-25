import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../session/session_Config";

const { pool, client } = require("../connections/connection");

let dev = [];
export default withIronSessionApiRoute(handler, ironOptions);

async function handler(req, res) {
  let device_Id = req.body.currDev;
  let table = req.body.table;

  if (
    typeof device_Id === "undefined" ||
    typeof req.session.devices === "undefined"
  ) {
    await res.status(200).json({ ok: false });
  } else {
    const rows = await pool.query(
      `select * from "${device_Id}"."${table}" ORDER BY created DESC LIMIT 1;   `
    );

    res.status(200).json({
      ok: true,
      hw: rows.rows[0],
    });
  }
}
