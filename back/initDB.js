const { Pool } = require('pg');
const connectionURL = 'postgres://vsqmijsx:z3x5eIidcipgeylTvNWmQPuq_bwd6LXD@mouse.db.elephantsql.com/vsqmijsx';
const pool = new Pool({connectionString: connectionURL});

// pool
//   .connect()
//   .then(client => {
//     return client
//       .query(`CREATE TABLE testtabledb (
//         id BIGSERIAL,
//         date DATE, 
//         name TEXT, 
//         amount INTEGER, 
//         distance INTEGER)`)
//       .then(res => {
//         client.release();
//         console.log(res.rows[0]);
//       })
//       .catch(err => {
//         client.release();
//         console.log(err.stack);
//       })
//       .finally(() => {
//         pool.end();
//       })
//   });

const seedData = () => {
  const names = [
    "Fedor", "Alex", "Semen", "Yury", "Boris", "Alena", "Olga", "Dmitry", "Igor", "Irina", "Oxana"
  ];
  const sql = `
    INSERT INTO testTableDB ( 
        date,
        name,
        amount,
        distance 
    ) VALUES ($1, $2, $3, $4)
  `;
  for (let i = 1; i < 5; i++) {
    const month = Math.trunc((Math.random() * 11) + 1);  
    const rowDate = `${i}.${month}.2022`; 
    const newName = names[Math.trunc(Math.random() * 11)];
    pool
      .connect()
      .then(client => {
        return client
          .query(sql, [rowDate, newName, Math.trunc((Math.random() * 1000) - 1), Math.trunc((Math.random() * 400) - 1)])
            .then(res => {
              client.release();
              console.log(res.rows[0]);
            })
            .catch(err => {
              client.release();
              console.log(err.stack);
            });
    });
  };  
};

// seedData();

pool
  .connect()
  .then(client => {
    return client
      .query(`SELECT * from testTableDB`)
      .then(res => {
        client.release();
        console.log(res.rows);
      })
      .catch(err => {
        client.release();
        console.log(err.stack);
      })
      .finally(() => {
        pool.end();
      })
  });