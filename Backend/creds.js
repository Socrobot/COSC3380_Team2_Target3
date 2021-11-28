const Client = require('pg').Client;

const client = new Client({
    user: "aycmddtu",
    password: "VaAsibShn4VbHMmPPuyO7o8gILrAc-LS",
    host: "otto.db.elephantsql.com",
    port: 5432,
    database: "aycmddtu"
});



module.exports = client;