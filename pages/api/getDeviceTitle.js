const mysql = require("mysql2/promise");

export default async function handler(req, res) {
  const device_Id = req.body.device_Id;

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
  });

  const [rows, d, y] = await connection.execute(
    `SELECT * FROM ${device_Id}.os;`,
    [device_Id]
  );

  res.send({
    OS: {
      id: device_Id,
      hostname: rows[0].hostname,
      version: rows[0].version,
      build: rows[0].build,
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
