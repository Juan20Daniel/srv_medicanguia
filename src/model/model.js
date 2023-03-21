const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'b56e07b7f87820',
    password: '24719ec4',
    database: 'heroku_b37ff0080f0c573'
})
pool.query('select 1 + 1', (err, rows) => { 
    if (err) {
        console.log(err);
    } else {
        console.log("THE DATABASE HAS BEEN CONNECTED")
    }
});


module.exports = pool;