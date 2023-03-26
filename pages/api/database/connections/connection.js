const fs = require("fs");
const { Client, Pool } = require("pg");

const config = {
  connectionString:
    "postgresql://MGproject:YP4rEujgDgdEcuUUE2e6xA@cluster-4036.6zw.cockroachlabs.cloud:26257/groupproject?sslmode=verify-full",
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.db_crt,
  },
};

const client = new Client(config);
client.connect((err) => {
  if (err) {
    console.error("error connecting to database (cockroach_db)", err.stack);
  } else {
  }
});

const pool = new Pool(config);

module.exports = { client, pool };
