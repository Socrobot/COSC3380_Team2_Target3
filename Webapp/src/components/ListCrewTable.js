import React, { Fragment, useEffect, useState } from "react"
import InputCrewTable from "./InputCrew";
import Editcrewtable from "./EditCrew";


const ListCrew = () => {

    const [crews, setcrews] = useState([]);
    const [crewflightjoins, setcrewflightjoins] = useState([]);

        // airplane table
        const crewtable = async() => {
            try {
                
                const response = await fetch("http://localhost:5001/crew")
                const jsonData = await response.json()
    
                setcrews(jsonData);
    
            } catch (err) {
                console.error(err.message);
            }
        };

        // airplane table
        const crewflightjoin = async() => {
            try {
                
                const response = await fetch("http://localhost:5001/crewflightjon")
                const jsonData = await response.json()
    
                setcrewflightjoins(jsonData);
    
            } catch (err) {
                console.error(err.message);
            }
        };

    useEffect(() => {
        crewtable();
        crewflightjoin();
    }, []);

    return (
        <Fragment>

            {/*Crew table*/}
            <h2 className="text-center mt-5">Crew</h2>
            {" "}
            <div className = "container text-center">
                <InputCrewTable />
            </div>
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>flight_id</th>
                        <th>crew_id</th>
                        <th>crew_firstname</th>
                        <th>crew_lastname</th>
                        <th>Edit</th>
                    </tr>
                </thead>
            <tbody>
                {crews.map(crew => (
                    <tr key={crew.flight_id}>
                        <td>{crew.flight_id}</td>
                        <td>{crew.crew_id}</td>
                        <td>{crew.crew_firstname}</td>
                        <td>{crew.crew_lastname}</td>
                        <td><Editcrewtable crew = {crew} /></td>
                    </tr>
                ))}
            </tbody>
            </table>

            {/*Crew table*/}
            <h2 className="text-center mt-5">Crew/Flight</h2>
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>flight_id</th>
                        <th>crew_id</th>
                        <th>crew_firstname</th>
                        <th>crew_lastname</th>
                        <th>airplane_code</th>
                        <th>departure_time</th>
                        <th>arrival_time</th>
                        <th>gate_no</th>
                        <th>airplane_status</th>
                    </tr>
                </thead>
            <tbody>
                {crewflightjoins.map(crew => (
                    <tr key={crew.flight_id}>
                        <td>{crew.flight_id}</td>
                        <td>{crew.crew_id}</td>
                        <td>{crew.crew_firstname}</td>
                        <td>{crew.crew_lastname}</td>
                        <td>{crew.airplane_code}</td>
                        <td>{crew.departure_time}</td>
                        <td>{crew.arrival_time}</td>
                        <td>{crew.gate_no}</td>
                        <td>{crew.airplane_status}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListCrew;