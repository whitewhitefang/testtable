const http = require('http');
const hostname = '127.0.0.1';
const port = 5000;
const { Pool } = require('pg');
const connectionURL = 'postgres://vsqmijsx:z3x5eIidcipgeylTvNWmQPuq_bwd6LXD@mouse.db.elephantsql.com/vsqmijsx';

const server = http.createServer();

let rawData;

const getting = async () => {
  const pool = new Pool({connectionString: connectionURL}); 
  pool
    .connect()
    .then(client => {
      return client
        .query(`SELECT * from testTableDB`)
        .then(res => {
          client.release();
          rawData = [...res.rows];
          return rawData;
        })
        .catch(err => {
          console.log(err.stack);
        })
        .finally(() => {
          pool.end();
        })
  });
};

getting();

server.on("request", async(req, res) => {
  if (req.url === "/api/get") {   
    res.writeHead(200, {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET',
      'Access-Control-Max-Age': 2592000
    }).end(JSON.stringify(rawData));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is running at address ${hostname} on ${port} port`);
});