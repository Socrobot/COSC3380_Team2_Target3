import React, { Fragment, useEffect, useState } from "react"
import InputCheckinTable from "./InputCheckin";
import Editcheckin from "./EditCheckin";


const ListCheckin = () => {

    const [checkin, setcheckin] = useState([]);
    const [checkinflightjoins, setcheckinflightjoins] = useState([]);

        // airplane table
        const checkintable = async() => {
            try {
                
                const response = await fetch("http://localhost:5001/checkin")
                const jsonData = await response.json()
    
                setcheckin(jsonData);
    
            } catch (err) {
                console.error(err.message);
            }
        };

        // airplane table
        const checkinflightjoin = async() => {
            try {
                
                const response = await fetch("http://localhost:5001/checkinflightjoin")
                const jsonData = await response.json()
    
                setcheckinflightjoins(jsonData);
    
            } catch (err) {
                console.error(err.message);
            }
        };

    useEffect(() => {
        checkintable();
        checkinflightjoin();
    }, []);

    return (
        <Fragment>

            {/*Crew table*/}
            <h2 className="text-center mt-5">Check-In</h2>
            {" "}
            <div className = "container text-center">
                <InputCheckinTable />
            </div>
            <div className = "scroll">
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>flight_id</th>
                            <th>ticket_no</th>
                            <th>no_of_bags</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                <tbody>
                    {checkin.map(checkin => (
                        <tr key={checkin.flight_id, checkin.ticket_no}>
                            <td>{checkin.flight_id}</td>
                            <td>{checkin.ticket_no}</td>
                            <td>{checkin.no_of_bags}</td>
                            <td><Editcheckin checkin = {checkin} /></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {/*Crew table*/}
            <h2 className="text-center mt-5">Crew/Flight</h2>
            <div className = "scroll">
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>flight_id</th>
                            <th>ticket_no</th>
                            <th>no_of_bags</th>
                            <th>airplane_code</th>
                            <th>departure_time</th>
                            <th>arrival_time</th>
                            <th>gate_no</th>
                            <th>airplane_status</th>
                        </tr>
                    </thead>
                <tbody>
                    {checkinflightjoins.map(checkins => (
                        <tr key={checkins.flight_id, checkins.ticket_no}>
                            <td>{checkins.flight_id}</td>
                            <td>{checkins.ticket_no}</td>
                            <td>{checkins.no_of_bags}</td>
                            <td>{checkins.airplane_code}</td>
                            <td>{checkins.departure_time}</td>
                            <td>{checkins.arrival_time}</td>
                            <td>{checkins.gate_no}</td>
                            <td>{checkins.airplane_status}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default ListCheckin;