const mysql = require("mysql2/promise");

export default async function handler(req, res) {
  const device_Id = "e368b009_dc92_11e5_9c43_bc00000c0000"; //req.body.device_Id;

  const connection = await mysql.createConnection({
    host: "185.38.61.93",
    user: "MGproject",
    password: "F37E28sINiKukaNegu4uzIDu3I7iXe",
    port: "3306",
    database: "groupproject",
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
