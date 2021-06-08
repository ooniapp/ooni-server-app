module.exports = {
  development: {
    client: "mysql",
    connection: {
      host : 'b0kpn4v89vemefvvrx95-mysql.services.clever-cloud.com',
      user : 'uuurzgqzvj2rpk7wf',
      password : 'OeCT3CYyO9aZ42Twlv9A',
      database : 'b0kpn4v89vemefvvrx95',
      timezone: "UTC",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "mysql",
    connection: {
      host : 'b0kpn4v89vemefvvrx95-mysql.services.clever-cloud.com',
      user : 'uuurzgqzvj2rpk7wf',
      password : 'OeCT3CYyO9aZ42Twlv9A',
      database : 'b0kpn4v89vemefvvrx95',
      timezone: "UTC",
    },
    pool: {
      min: 2,
      max: 10,
    
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "mysql",
    connection: {
      host : 'b0kpn4v89vemefvvrx95-mysql.services.clever-cloud.com',
      user : 'uuurzgqzvj2rpk7wf',
      password : 'OeCT3CYyO9aZ42Twlv9A',
      database : 'b0kpn4v89vemefvvrx95',
    timezone: "UTC",
    },
    pool: {
      min: 2,
      max: 10,
    
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
