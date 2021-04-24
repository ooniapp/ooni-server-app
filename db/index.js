const result = require("dotenv").config();

if (result.error) {
  throw result.error;
}
const env = result.parsed;

const knex = require("knex")({
  client: "pg",
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT || 5432,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_DATABASE
  }
});

module.exports = knex;
