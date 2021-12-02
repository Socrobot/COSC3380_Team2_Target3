import React, { Fragment, useEffect, useState } from "react"
import InputAirplaneTable from "./InputAirplane";
import EditAirplaneTable from "./EditAirplane";

const ListAirplaneTable = () => {

    const [airplane, setairplane] = useState([])
    const [airplaneflightjoins, setairplaneflightjoins] = useState([])

        // airplane table
        const airplanetable = async() => {
            try {
                
                const response = await fetch("http://localhost:5001/airplane")
                const jsonData = await response.json()
    
                setairplane(jsonData);
    
            } catch (err) {
                console.error(err.message);
            }
        };

        // airplane table
        const airplaneflightjointable = async() => {
            try {
                
                const response = await fetch("http://localhost:5001/airplaneflightjoin")
                const jsonData = await response.json()
    
                setairplaneflightjoins(jsonData);
    
            } catch (err) {
                console.error(err.message);
            }
        };

    useEffect(() => {
        airplanetable();
        airplaneflightjointable();
    }, []);

    return (
        <Fragment>

            {/*Airplane table*/}
            <h2 className="text-center mt-5">Airplane</h2>
            {" "}
            <div className = "container text-center">
            <InputAirplaneTable />
            </div>
            <div className = "scroll">
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>airplane_code</th>
                            <th>airplane_model</th>
                            <th>airplane_capacity</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                <tbody>
                    {airplane.map(airplane => (
                        <tr key={airplane.airplane_code}>
                            <td>{airplane.airplane_code}</td>
                            <td>{airplane.airplane_model}</td>
                            <td>{airplane.airplane_capacity}</td>
                            <td><EditAirplaneTable airplane = {airplane} /></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>

            {/* Airplane table */}
            <h2 className="text-center mt-5">Airplane/Flight</h2>
            {" "}
            <div className = "scroll">
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>airplane_code</th>
                            <th>airplane_model</th>
                            <th>airplane_capacity</th>
                            <th>flight_id</th>
                            <th>departure_time</th>
                            <th>arrival_time</th>
                            <th>gate_no</th>
                            <th>airplane_status</th>
                        </tr>
                    </thead>
                <tbody>
                    {airplaneflightjoins.map(airplane => (
                        <tr key={airplane.airplane_code}>
                            <td>{airplane.airplane_code}</td>
                            <td>{airplane.airplane_model}</td>
                            <td>{airplane.airplane_capacity}</td>
                            <td>{airplane.flight_id}</td>
                            <td>{airplane.departure_time}</td>
                            <td>{airplane.arrival_time}</td>
                            <td>{airplane.gate_no}</td>
                            <td>{airplane.airplane_status}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default ListAirplaneTable;