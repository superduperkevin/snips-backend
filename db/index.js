const pg = require('pg');

const connectionString = `postgresql://kamarbayar:1@localhost:5050/snips`;

const client = new pg.Client(connectionString);

// opens a single connection to the database
client.connect();

client
  .query('SELECT * FROM snippet')
  .then(result => {
    console.log(result.rows);
  })
  .then(() => {
    client.end();
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    client.end();
  });
