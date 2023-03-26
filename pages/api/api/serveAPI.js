const { pool, client } = require("../database/connections/connection");

export default async function loginRoute(req, res) {
  let key = req.query.key;
  let device = req.query.device;
  let table = req.query.table;

  if (await isValid(key, device)) {
    let info = await pool.query(
      `SELECT * FROM "${device}"."${table}"  LIMIT 1000;`
    );
    await res.status(200).json(info.rows);
  } else {
    await res
      .status(200)
      .json(
        "Cannot validate api_key and device_id pair. Do you have access to this device?"
      );
  }
}

async function isValid(key, device) {
  let valid = false;
  let user = await pool.query(
    `SELECT user_id FROM "groupproject"."user" WHERE api_key LIKE '${key}' LIMIT 1`
  );
  const devices = await pool.query(
    `SELECT * FROM "groupproject"."device" where "user" = '${user.rows[0].user_id}' ;`
  );
  Object.values(devices.rows).forEach((el) => {
    if (el.id == device) {
      valid = true;
    }
  });
  return valid;
}
