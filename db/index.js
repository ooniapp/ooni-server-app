
const knex = require("knex")({
  client: "mysql",
  connection: {
    host : 'us-cdbr-east-03.cleardb.com',
    user : 'bfbaf3145188e3',
    password : 'a08cd334',
    database : 'heroku_31115dc178c7353'
  },
});


module.exports = knex;
