require('dotenv').config();

const pg = require('pg');

const { DB_USER, DB_DATABASE, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const pool = new pg.Pool({ connectionString });

// opens a single connection to the database
// pool.connect();

// pool
//   .query('SELECT * FROM snippet')
//   .then(result => {
//     console.table(result.rows);
//   })
//   .catch(err => {
//     console.error(err);
//   })
//   .finally(() => {
//     pool.end();
//   });

module.exports = pool;
