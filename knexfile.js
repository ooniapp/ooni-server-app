

module.exports = {
  development: {
    client: "pg",
    connection: process.env.POSTGRESQL_ADDON_URI,
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "pg",
    connection: process.env.POSTGRESQL_ADDON_URI,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: process.env.POSTGRESQL_ADDON_URI,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
