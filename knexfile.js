

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host : 'bph4d8g5xvbilnppc3du-mysql.services.clever-cloud.com',
      user : 'uprmdbmqgk9kvemt',
      password : 'z5yMquhj5GYRNUgvTnbX',
      database : 'bph4d8g5xvbilnppc3du'
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
      host : 'bph4d8g5xvbilnppc3du-mysql.services.clever-cloud.com',
      user : 'uprmdbmqgk9kvemt',
      password : 'z5yMquhj5GYRNUgvTnbX',
      database : 'bph4d8g5xvbilnppc3du'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        conn.query('SET timezone="UTC";', (err)=>{
          if (err) {
            console.log(err)
          }
          done(err, conn)
        })
      },
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "mysql",
    connection: {
      host : 'bph4d8g5xvbilnppc3du-mysql.services.clever-cloud.com',
    user : 'uprmdbmqgk9kvemt',
    password : 'z5yMquhj5GYRNUgvTnbX',
    database : 'bph4d8g5xvbilnppc3du'
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, done) => {
        conn.query('SET timezone="UTC";', (err)=>{
          if (err) {
            console.log(err)
          }
          done(err, conn)
        })
      },
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
