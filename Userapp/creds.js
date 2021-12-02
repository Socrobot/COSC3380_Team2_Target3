const Client = require('pg').Client;

const client = new Client({
    user: "dbs002",
    password: "dbs002",
    host: "3380db.cs.uh.edu",
    port: 5432,
    database: "COSC3380"
});



module.exports = client;