module.exports = {
  development: {
    client: "pg",
    connection: 'postgresql://uhitxkonziuqebjekhkw:BUIdpmda0kwtL8JdLMLn@bcemnb5gmge22dd4hwfh-postgresql.services.clever-cloud.com:5432/bcemnb5gmge22dd4hwfh',

    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "pg",
  connection: 'postgresql://uhitxkonziuqebjekhkw:BUIdpmda0kwtL8JdLMLn@bcemnb5gmge22dd4hwfh-postgresql.services.clever-cloud.com:5432/bcemnb5gmge22dd4hwfh',
    pool: {
      min: 2,
      max: 10,
    
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: 'postgresql://uhitxkonziuqebjekhkw:BUIdpmda0kwtL8JdLMLn@bcemnb5gmge22dd4hwfh-postgresql.services.clever-cloud.com:5432/bcemnb5gmge22dd4hwfh',  
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
