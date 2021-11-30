import React, { Fragment, useEffect, useState } from "react";
import EditFlightTable from "./EditFlightTable";
import InputFlightTable from "./InputFlightTable";

const ListFlightTable = () => {

    const [flightInflightJoin, setflightInflightJoin] = useState([])

    // Joined Flight and inflight_offerings table
        const JoinedFlightInflight = async() => {
        try {
            
            const response = await fetch("http://localhost:5001/flightInflighJoin")
            const jsonData = await response.json()

            setflightInflightJoin(jsonData);

            console.log(jsonData);

        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        JoinedFlightInflight();
    }, []);

    return (
        <Fragment>
            {/*Flight table*/}
            <h2 className="text-center mt-5">Flight</h2>
            {" "}
            <div className = "container text-center">
                <InputFlightTable />
            </div>
                <div className = "scroll">
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>flight_id</th>
                            <th>airplane_code</th>
                            <th>departure_time</th>
                            <th>arrival_time</th>
                            <th>gate_no</th>
                            <th>airplane_status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                <tbody>
                    {flightInflightJoin.map(flight => (
                        <tr key={flight.flight_id}>
                            <td>{flight.flight_id}</td>
                            <td>{flight.airplane_code}</td>
                            <td>{flight.departure_time}</td>
                            <td>{flight.arrival_time}</td>
                            <td>{flight.gate_no}</td>
                            <td>{flight.airplane_status}</td>
                            <td><EditFlightTable flight = {flight}/></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>


            {/*Inflight_offerings table*/}
            <h2 className="text-center mt-5">Inflight Offerings</h2>
            {" "}
            <div className = "scroll">
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>flight_id</th>
                            <th>movie</th>
                            <th>wifi</th>
                            <th>food_beverage</th>
                        </tr>
                    </thead>
                <tbody>
                    {flightInflightJoin.map(flight => (
                        <tr key={flight.flight_id}>
                            <td>{flight.flight_id}</td>
                            <td>{flight.movie}</td>
                            <td>{flight.wifi}</td>
                            <td>{flight.food_beverage}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {/*Joined Inflight and flight table*/}
            <h2 className="text-center mt-5">Flight/Inflight Offerings</h2>
            {" "}
            <div className = "scroll">
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>flight_id</th>
                            <th>airplane_code</th>
                            <th>departure_time</th>
                            <th>arrival_time</th>
                            <th>gate_no</th>
                            <th>airplane_status</th>
                            <th>movie</th>
                            <th>wifi</th>
                            <th>food_beverage</th>
                        </tr>
                    </thead>
                <tbody>
                    {flightInflightJoin.map(flight => (
                        <tr key={flight.flight_id}>
                            <td>{flight.flight_id}</td>
                            <td>{flight.airplane_code}</td>
                            <td>{flight.departure_time}</td>
                            <td>{flight.arrival_time}</td>
                            <td>{flight.gate_no}</td>
                            <td>{flight.airplane_status}</td>
                            <td>{flight.movie}</td>
                            <td>{flight.wifi}</td>
                            <td>{flight.food_beverage}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default ListFlightTable;