
const knex = require("knex")({
  client: "mysql",
  connection: {
    host : process.env.RDS_HOSTNAME,
    user : process.env.RDS_HOSTNAME,
    password : process.env.RDS_PASSWORD,
    database :  process.env.RDS_DB_NAME
  },
});


module.exports = knex;
