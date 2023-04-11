const { pool, client } = require("../database/connections/connection");
var validator = require("validator");

export default async function loginRoute(req, res) {
  let key = validator.escape(req.query.key);
  let device = validator.escape(req.query.device);
  let table = validator.escape(req.query.table);

  if (await isValid(key, device)) {
    try {
      let info = await pool.query(
        `SELECT * FROM "${device}"."${table}"  LIMIT 1000;`
      );
      await res.status(200).json(info.rows);
    } catch (error) {
      await res.status(200).json("Error while processing your inputs");
    }
  } else {
    await res
      .status(200)
      .json(
        "Cannot validate your API key and device ID pair. Common issues: No access to this device or key has been changed."
      );
  }
}

async function isValid(key, device) {
  let valid = false;
  let user = await pool.query(
    `SELECT user_id FROM "groupproject"."user" WHERE api_key LIKE '${key}' LIMIT 1`
  );

  if (user.rowCount == 0) {
    return false;
  } else {
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
}
