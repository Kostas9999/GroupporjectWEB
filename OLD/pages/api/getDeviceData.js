const mysql = require("mysql2");

export default function handler(req, res) {
  const device_Id = req.body.device_Id;

  const connection = mysql.createConnection({
    host: "185.38.61.93",
    user: "MGproject",
    password: "F37E28sINiKukaNegu4uzIDu3I7iXe",
    port: 3306,
    database: "groupproject",
  });

  let os = "";
  let hardware = "";
  let iface = "";
  let networkstats = "";
  let ports = "";

  // simple query
  connection.query(
    `SELECT * FROM ${device_Id}.os;`,
    function (err, results, fields) {
      if (typeof results !== "undefined") {
        os = results;
      }

      connection.query(
        `SELECT * FROM ${device_Id}.hardware;`,
        function (err, results, fields) {
          if (typeof results !== "undefined") {
            hardware = results;
          }

          connection.query(
            `SELECT * FROM ${device_Id}.networkinterface;`,
            function (err, results, fields) {
              if (typeof results !== "undefined") {
                iface = results;
              }

              connection.query(
                `SELECT * FROM ${device_Id}.networkstats ORDER BY created ASC ;`,
                function (err, results, fields) {
                  if (typeof results !== "undefined") {
                    networkstats = results;
                  }

                  connection.query(
                    `SELECT * FROM ${device_Id}.ports;`,
                    function (err, results, fields) {
                      if (typeof results !== "undefined") {
                        ports = results;
                      }

                      res.status(200).json({
                        os: os,
                        hardware: hardware,
                        iface: iface,
                        networkstats: networkstats,
                        ports: ports,
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}
