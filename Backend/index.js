const express = require("express")
const app = express();
const cors = require("cors");
const client = require("./creds")
const fs = require('fs');
const util = require('util');
const appendFile = util.promisify(fs.appendFile);

//middleware
app.use(cors());
app.use(express.json());

async function startServer () {
    try {
        await client.connect()
        console.log('db connected')
        await startingTransaction()
    } catch (err) {
        console.error(err.message)
        console.log('Could not connect')
    }
};

// Starts a transaction 
async function startingTransaction(){
    try {
        q = `/*Starting a transaction*/
BEGIN;`;
        const newTransaction = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
    } catch (err) {
        console.error(err.message);
    }
};;

async function transactionerrorhandling(){
    try {
        q = `/*Rolling back the transaction*/
        ROLLBACK;`;
            const newRollback = await client.query(q);
            await appendFile('transaction.sql', `${q}\n\n`);
            await startingTransaction();
    } catch (err) {
        console.log(err.message);
    }
};

// Rollback a transaction 
app.post("/rollback", async(req, res) => {
    try {
        q = `/*Rolling back the transaction*/
ROLLBACK;`;
        const newRollback = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await startingTransaction();
        res.json("Rollback Current Transaction!");
    } catch (err) {
        console.error(err.message);
    }
});

// Commit a transaction
app.post("/end", async(req, res) => {
    try {
        q = `/*commiting the transaction*/
END;`;
        const newCommit = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await startingTransaction();
        res.json("End Current Transaction!");
    } catch (err) {
        console.error(err.message);
    }
});

// create for Flight table
app.post("/flightTable", async(req, res) => {
    try {
        const { flight_id } = req.body;
        const { airplane_code } = req.body;
        const { departure_time } = req.body;
        const { arrival_time } = req.body;
        const { gate_no } = req.body;
        const { airplane_status } = req.body;

        q = `/*Creating new flight table entry*/
INSERT INTO flight 
(flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status)
VALUES($1, $2, $3, $4, $5, $6);`;

        const newFlight = await client.query(q, 
            [flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status]
            );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(newFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create for inflight_offerings
app.post("/inflightOfferings", async(req, res) => {
    try {
        const { flight_id } = req.body;
        const { movie } = req.body;
        const { wifi } = req.body;
        const { food_beverage } = req.body;

        q = `/*Creating new flight table entry*/
INSERT INTO inflight_offerings 
(flight_id, movie, wifi, food_beverage)
VALUES($1, $2, $3, $4);`;

        const newFlight = await client.query(q, 
            [flight_id, movie, wifi, food_beverage]
            );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(newFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// get all offering from inflight_offerings table
app.get("/flightInflighJoin", async(req, res) => {
    try {

        q = `/*Selecting the flight table*/
SELECT flight.flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status, movie, wifi, food_beverage 
FROM flight, inflight_offerings
WHERE flight.flight_id = inflight_offerings.flight_id;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// get single flight from flight table
app.get("/flightTable/:id", async(req, res) => {
    try {
        const {id} = req.params;

        q = `/*Selecting a single flight from flight table*/
SELECT * FROM flight
WHERE flight_id = $1;`;

        const singleFlight = await client.query(q, [id]);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(singleFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// get single flight from flight table
app.get("/inflightofferings/:id", async(req, res) => {
    try {
        const {id} = req.params;

        q = `/*Selecting a single flight from flight table*/
SELECT * FROM inflight_offerings
WHERE flight_id = $1;`;

        const singleFlight = await client.query(q, [id]);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(singleFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update a flight in flights table
app.put("/flightTable/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { airplane_code } = req.body;
        const { departure_time } = req.body;
        const { arrival_time } = req.body;
        const { gate_no } = req.body;
        const { airplane_status } = req.body;

        q = `/*Updating an existing flight from flight table*/
UPDATE flight SET \
airplane_code = $1,\
departure_time = $2,\
arrival_time = $3,\
gate_no = $4, \
airplane_status = $5
WHERE flight_id = $6;`;

        const updateFlights = await client.query(q, 
        [airplane_code, departure_time, arrival_time, gate_no, airplane_status, id]
        );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json("Flight table was updated");
    } catch (err) {
        console.error(err.message);
    }
});

// update a offerings in inflight_offerings table
app.put("/inflightOfferings/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { movie } = req.body;
        const { wifi } = req.body;
        const { food_beverage } = req.body;

        q = `/*Updating an existing flight from flight table*/
UPDATE inflight_offerings SET \
movie = $1,\
wifi = $2,\
food_beverage = $3 \
WHERE flight_id = $4;`;

        const updateFlights = await client.query(q, 
        [movie, wifi, food_beverage, id]
        );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json("Flight table was updated");
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

app.listen(5001, () => {
    console.log("server has started");
});

startServer();