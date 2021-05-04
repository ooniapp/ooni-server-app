
const knex = require("knex")({
  client: "pg",
  connection: process.env.POSTGRESQL_ADDON_URI,
});

module.exports = knex;
