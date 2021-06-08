
const knex = require("knex")({
  client: "mysql",
  connection: {
    host : 'b0kpn4v89vemefvvrx95-mysql.services.clever-cloud.com',
    user : 'uuurzgqzvj2rpk7wf',
    password : 'OeCT3CYyO9aZ42Twlv9A',
    database : 'b0kpn4v89vemefvvrx95'
  },
});


module.exports = knex;
