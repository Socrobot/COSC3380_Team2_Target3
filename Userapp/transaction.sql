/*Starting a transaction*/
BEGIN;

/*Selecting the flight/inflight table*/
SELECT flight.flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status, movie, wifi, food_beverage 
FROM flight, inflight_offerings
WHERE flight.flight_id = inflight_offerings.flight_id
ORDER BY flight_id;

/*Selecting the checkin/flight table*/
SELECT flight.flight_id, ticket_no, no_of_bags, airplane_code, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, checkin
WHERE flight.flight_id = checkin.flight_id
ORDER BY flight_id;

/*Selecting the checkin/flight table*/
SELECT flight.flight_id, ticket_no, no_of_bags, airplane_code, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, checkin
WHERE flight.flight_id = checkin.flight_id
ORDER BY flight_id;

/*Selecting the crew table*/
SELECT flight.flight_id, crew_id, crew_firstname, crew_lastname, airplane_code, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, crew
WHERE flight.flight_id = crew.flight_id
ORDER BY flight_id;

/*Selecting the crew table*/
SELECT flight.flight_id, crew_id, crew_firstname, crew_lastname, airplane_code, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, crew
WHERE flight.flight_id = crew.flight_id
ORDER BY flight_id;

/*Selecting the flight/airplane tables*/
SELECT airplane.airplane_code, airplane_model, airplane_capacity, flight_id, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, airplane
WHERE flight.airplane_code = airplane.airplane_code
ORDER BY airplane.airplane_code;

/*Selecting the flight/airplane tables*/
SELECT airplane.airplane_code, airplane_model, airplane_capacity, flight_id, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, airplane
WHERE flight.airplane_code = airplane.airplane_code
ORDER BY airplane.airplane_code;

/*Selecting the flight/inflight table*/
SELECT flight.flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status, movie, wifi, food_beverage 
FROM flight, inflight_offerings
WHERE flight.flight_id = inflight_offerings.flight_id
ORDER BY flight_id;

/*Selecting the checkin/flight table*/
SELECT flight.flight_id, ticket_no, no_of_bags, airplane_code, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, checkin
WHERE flight.flight_id = checkin.flight_id
ORDER BY flight_id;

/*Selecting the checkin/flight table*/
SELECT flight.flight_id, ticket_no, no_of_bags, airplane_code, departure_time, arrival_time, gate_no, airplane_status 
FROM flight, checkin
WHERE flight.flight_id = checkin.flight_id
ORDER BY flight_id;

/*Selecting the checkin/passengers table*/
SELECT checkin.ticket_no, flight_id, no_of_bags, seat_no, passenger_lastname, passenger_firstname 
FROM passenger, checkin
WHERE passenger.ticket_no = checkin.ticket_no
ORDER BY ticket_no;

/*Selecting the checkin/passengers table*/
SELECT checkin.ticket_no, flight_id, no_of_bags, seat_no, passenger_lastname, passenger_firstname 
FROM passenger, checkin
WHERE passenger.ticket_no = checkin.ticket_no
ORDER BY ticket_no;

/*Selecting the flight/inflight table*/
SELECT flight.flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status, movie, wifi, food_beverage 
FROM flight, inflight_offerings
WHERE flight.flight_id = inflight_offerings.flight_id
ORDER BY flight_id;

