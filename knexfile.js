

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host : process.env.RDS_HOSTNAME,
      user : process.env.RDS_HOSTNAME,
      password : process.env.RDS_PASSWORD,
      database :  process.env.RDS_DB_NAME
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

  staging: {
    client: "mysql",
    connection: {
      host : process.env.RDS_HOSTNAME,
      user : process.env.RDS_HOSTNAME,
      password : process.env.RDS_PASSWORD,
      database :  process.env.RDS_DB_NAME
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
      host : process.env.RDS_HOSTNAME,
      user : process.env.RDS_HOSTNAME,
      password : process.env.RDS_PASSWORD,
      database :  process.env.RDS_DB_NAME
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
