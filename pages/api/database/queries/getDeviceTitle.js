const { client } = require("../connections/connection");
export default async function handler(req, res) {
  const device_Id = req.body.device_Id;

  const rows = await client.query(`SELECT * FROM ${device_Id}.os;`);
  await res.status(200).json({
    OS: {
      id: device_Id,
      hostname: rows.rows[0].hostname,
      version: rows.rows[0].version,
      build: rows.rows[0].build,
    },
  });
  /*

  // simple query
  connection.query(
    `SELECT * FROM ${device_Id}.os;`,
    function (err, results, fields) {
      if (typeof results !== "undefined") {
        res.send({
          OS: {
            id: device_Id,
            hostname: results[0].hostname,
            version: results[0].version,
            build: results[0].build,
          },
        });
      }
    }
  );

  */
}
