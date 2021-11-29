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


/* CONNECTION CHECK */

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

/* TRANSACTION QUIERES/CHECKS/HANDELING */

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

/* END OF TRANSACTION QUIERES/CHECKS/HANDELING */



/* FLIGHT TABLE QUERIES */

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

// update a flight in flights table
app.put("/flightTable/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { flight_id } = req.body;
        const { airplane_code } = req.body;
        const { departure_time } = req.body;
        const { arrival_time } = req.body;
        const { gate_no } = req.body;
        const { airplane_status } = req.body;

        q = `/*Updating an existing flight from flight table*/
UPDATE flight SET \
flight_id = $1, \
airplane_code = $2,\
departure_time = $3,\
arrival_time = $4,\
gate_no = $5, \
airplane_status = $6
WHERE flight_id = $7;`;

        const updateFlights = await client.query(q, 
        [flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status, id]
        );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json("Flight table was updated");
    } catch (err) {
        console.error(err.message);
    }
});

/* END OF FLIGHT TABLE QUERIES */



/* INFLIGHT TABLE QUERIES */

// Create for inflight_offerings
app.post("/inflightOfferings", async(req, res) => {
    try {
        const { flight_id } = req.body;
        const { movie } = req.body;
        const { wifi } = req.body;
        const { food_beverage } = req.body;

        q = `/*Creating new inflight table entry*/
INSERT INTO inflight_offerings 
(flight_id, movie, wifi, food_beverage)
VALUES($1, $2, $3, $4);`;

        const newinFlight = await client.query(q, 
            [flight_id, movie, wifi, food_beverage]
            );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(newinFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// update a offerings in inflight_offerings table
app.put("/inflightOfferings/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { flight_id } = req.body;
        const { movie } = req.body;
        const { wifi } = req.body;
        const { food_beverage } = req.body;

        q = `/*Updating an existing inflight_offerings from flight_offerings table*/
UPDATE inflight_offerings SET \
flight_id = $1, \
movie = $2,\
wifi = $3,\
food_beverage = $4 \
WHERE flight_id = $5;`;

        const updateFlights = await client.query(q, 
        [flight_id, movie, wifi, food_beverage, id]
        );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json("Flight table was updated");
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

/* END OF INFLIGHT TABLE QUERIES */



/* AIRPLANE TABLE QUERIES */

// Create for airplane
app.post("/airplane", async(req, res) => {
    try {
        const { airplane_code } = req.body;
        const { airplane_model } = req.body;
        const { airplane_capacity } = req.body;

        q = `/*Creating new airplane table entry*/
INSERT INTO airplane 
(airplane_code, airplane_model, airplane_capacity)
VALUES($1, $2, $3);`;

        const newFlight = await client.query(q, 
            [airplane_code, airplane_model, airplane_capacity]
            );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(newFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// get all airplanes from airplane table
app.get("/airplane", async(req, res) => {
    try {

        q = `/*Selecting the airplanes table*/
SELECT * FROM airplane
ORDER BY airplane_code;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// update a airplane for airplane table
app.put("/airplane/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { airplane_code } = req.body;
        const { airplane_model } = req.body;
        const { airplane_capacity } = req.body;

        q = `/*Updating an existing airplanes from airplane table*/
UPDATE airplane SET \
airplane_code = $1, \
airplane_model = $2, \
airplane_capacity = $3 \
WHERE airplane_code = $4;`;

        const updateFlights = await client.query(q, 
        [airplane_code, airplane_model, airplane_capacity, id]
        );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json("Flight table was updated");
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

/* END OF AIRPLANE TABLE QUERIES */

/* JOINED TABLE QUERIES */

// get all offering from inflight_offerings table
app.get("/flightInflighJoin", async(req, res) => {
    try {

        q = `/*Selecting the flight/inflight table*/
SELECT flight.flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status, movie, wifi, food_beverage 
FROM flight, inflight_offerings
WHERE flight.flight_id = inflight_offerings.flight_id
ORDER BY flight_id;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// get all offering from inflight_offerings table
app.get("/airplaneflightjoin", async(req, res) => {
    try {

        q = `/*Selecting the flight/airplane tables*/
SELECT airplane.airplane_code, airplane_model, airplane_capacity, flight_id, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, airplane
WHERE flight.airplane_code = airplane.airplane_code
ORDER BY airplane.airplane_code;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

app.get("/crewflightjon", async(req, res) => {
    try {

        q = `/*Selecting the crew table*/
SELECT flight.flight_id, crew_id, crew_firstname, crew_lastname, airplane_code, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, crew
WHERE flight.flight_id = crew.flight_id
ORDER BY flight_id;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

app.get("/checkinflightjoin", async(req, res) => {
    try {

        q = `/*Selecting the checkin/flight table*/
SELECT flight.flight_id, ticket_no, no_of_bags, airplane_code, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, checkin
WHERE flight.flight_id = checkin.flight_id
ORDER BY flight_id;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

app.get("/passengercheckinjoin", async(req, res) => {
    try {

        q = `/*Selecting the checkin/passengers table*/
SELECT checkin.ticket_no, flight_id, no_of_bags, seat_no, passenger_lastname, passenger_firstname 
FROM passenger, checkin
WHERE passenger.ticket_no = checkin.ticket_no
ORDER BY ticket_no;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

/* END OF JOINED TABLE QUERIES */



/* CREW TABLE QUERIES */

// Create for crew table
app.post("/crew", async(req, res) => {
    try {
        const { flight_id } = req.body;
        const { crew_id } = req.body;
        const { crew_firstname } = req.body;
        const { crew_lastname } = req.body;

        q = `/*Creating new crew table entry*/
INSERT INTO crew 
(flight_id, crew_id, crew_firstname, crew_lastname)
VALUES($1, $2, $3, $4);`;

        const newFlight = await client.query(q, 
            [flight_id, crew_id, crew_firstname, crew_lastname]
            );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(newFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// get all crews from crew table
app.get("/crew", async(req, res) => {
    try {

        q = `/*Selecting the crew table*/
SELECT * FROM crew
ORDER BY flight_id;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// update a crew for crew table
app.put("/crew/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { flight_id } = req.body;
        const { crew_id } = req.body;
        const { crew_firstname } = req.body;
        const { crew_lastname } = req.body;

        const id_split = id.split('*');

        q = `/*Updating an existing airplanes from airplane table*/
UPDATE crew SET \
flight_id = $1, \
crew_id = $2, \
crew_firstname = $3, \
crew_lastname = $4 \
WHERE flight_id = $5 AND crew_id = $6;`;

        const updateFlights = await client.query(q, 
        [flight_id, crew_id, crew_firstname, crew_lastname, id_split[0], id_split[1]]
        );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json("Flight table was updated");
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

/* END OF CREW TABLE QUERIES */



/* CHECK-IN TABLE QUERIES */

// Create for check-in table
app.post("/checkin", async(req, res) => {
    try {
        const { flight_id } = req.body;
        const { ticket_no } = req.body;
        const { no_of_bags } = req.body;

        q = `/*Creating new airplane table entry*/
INSERT INTO checkin 
(flight_id, ticket_no, no_of_bags)
VALUES($1, $2, $3);`;

        const newFlight = await client.query(q, 
            [flight_id, ticket_no, no_of_bags]
            );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(newFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// get all checkins from checkin table
app.get("/checkin", async(req, res) => {
    try {

        q = `/*Selecting the checkin table*/
SELECT * FROM checkin
ORDER BY flight_id;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// update a crew for crew table
app.put("/checkin/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { flight_id } = req.body;
        const { ticket_no } = req.body;
        const { no_of_bags } = req.body;

        const id_split = id.split('*');

        q = `/*Updating an existing checkin from checkin table*/
UPDATE checkin SET \
flight_id = $1, \
ticket_no = $2, \
no_of_bags = $3 \
WHERE flight_id = $4 AND ticket_no = $5;`;

        const updateFlights = await client.query(q, 
        [flight_id, ticket_no, no_of_bags, id_split[0], id_split[1]]
        );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json("Flight table was updated");
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

/* END OF CREW TABLE QUERIES */



/* PASSENGER TABLE QUERIES */

// Create for passenger table
app.post("/passenger", async(req, res) => {
    try {
        const { ticket_no } = req.body;
        const { seat_no } = req.body;
        const { passenger_lastname } = req.body;
        const { passenger_firstname } = req.body;

        q = `/*Creating new passengers table entry*/
INSERT INTO passenger 
(ticket_no, seat_no, passenger_lastname, passenger_firstname)
VALUES($1, $2, $3, $4);`;

        const newFlight = await client.query(q, 
            [ticket_no, seat_no, passenger_lastname, passenger_firstname, ]
            );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(newFlight.rows[0]);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// get all passengers from crew table
app.get("/passenger", async(req, res) => {
    try {

        q = `/*Selecting the passenger table*/
SELECT * FROM passenger
ORDER BY ticket_no;`;

        const allFlights = await client.query(q);
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json(allFlights.rows);
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});

// update a crew for crew table
app.put("/passenger/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { ticket_no } = req.body;
        const { seat_no } = req.body;
        const { passenger_lastname } = req.body;
        const { passenger_firstname } = req.body;

        q = `/*Updating an existing passenger from checkin table*/
UPDATE passenger SET \
ticket_no = $1, \
seat_no = $2, \
passenger_lastname = $3, \
passenger_firstname = $4 \
WHERE ticket_no = $5;`;

        const updateFlights = await client.query(q, 
        [ticket_no, seat_no, passenger_lastname, passenger_firstname, id]
        );
        await appendFile('transaction.sql', `${q}\n\n`);
        await appendFile('query.sql', `${q}\n\n`);
        res.json("Flight table was updated");
    } catch (err) {
        console.error(err.message);
        await transactionerrorhandling();
    }
});


// listening to port 5001 
app.listen(5001, () => {
    console.log("server has started");
});

startServer();