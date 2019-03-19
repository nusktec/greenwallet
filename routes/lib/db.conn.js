//db class of instance
var sql = require('node-mysql-helper');
var mysqlOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    socketPath: false,
    connectionLimit: 0
};
sql.connect(mysqlOptions);
module.exports = sql;