
const knex = require("knex")({
  client: "mysql",
  connection: {
    host : 'bph4d8g5xvbilnppc3du-mysql.services.clever-cloud.com',
    user : 'uprmdbmqgk9kvemt',
    password : 'z5yMquhj5GYRNUgvTnbX',
    database : 'bph4d8g5xvbilnppc3du'
  },
});


module.exports = knex;
