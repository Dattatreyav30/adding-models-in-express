const mysql = require('mysql2');

const pool = mysql.createPool({
   host : 'localhost' ,
   user : 'root',
   database : 'node_complete',
   password : 'Mykoshi@3',
})

module.exports  = pool.promise();