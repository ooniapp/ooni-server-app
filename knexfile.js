

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host : 'us-cdbr-east-03.cleardb.com',
      user : 'bfbaf3145188e3',
      password : 'a08cd334',
      database : 'heroku_31115dc178c7353'
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "mysql",
    connection: {
      host : 'us-cdbr-east-03.cleardb.com',
      user : 'bfbaf3145188e3',
      password : 'a08cd334',
      database : 'heroku_31115dc178c7353'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "mysql",
    connection: {
      host : 'us-cdbr-east-03.cleardb.com',
      user : 'bfbaf3145188e3',
      password : 'a08cd334',
      database : 'heroku_31115dc178c7353'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
