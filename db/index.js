
const knex = require("knex")({
  client: "pg",
  connection: 'postgresql://uhitxkonziuqebjekhkw:BUIdpmda0kwtL8JdLMLn@bcemnb5gmge22dd4hwfh-postgresql.services.clever-cloud.com:5432/bcemnb5gmge22dd4hwfh'

});


module.exports = knex;
