

if (result.error) {
  throw result.error;
}

const knex = require("knex")({
  client: "pg",
  connection: DB_URL,
});

module.exports = knex;
