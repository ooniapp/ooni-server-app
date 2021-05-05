
const knex = require("knex")({
  client: "pg",
  connection: {
    host : '127.0.0.1:8889',
    user : 'root',
    password : 'root',
    database : 'ooni_database'
  }
});

module.exports = knex;
