import React, { Fragment, useEffect, useState } from "react"
import Inputpassengertable from "./Inputpassenger";
import EditPassengerTable from "./EditPassenger";


const Listpassenger = () => {

    const [passengerz, setpassengerz] = useState([]);
    const [checkinpassengerjoins, setcheckinpassengerjoins] = useState([]);

        // airplane table
        const passengertable = async() => {
            try {
                
                const response = await fetch("http://localhost:5001/passenger")
                const jsonData = await response.json()
    
                setpassengerz(jsonData);
    
            } catch (err) {
                console.error(err.message);
            }
        };

        // airplane table
        const checkinpassengerjoin = async() => {
            try {
                
                const response = await fetch("http://localhost:5001/passengercheckinjoin")
                const jsonData = await response.json()
    
                setcheckinpassengerjoins(jsonData);
    
            } catch (err) {
                console.error(err.message);
            }
        };

    useEffect(() => {
        passengertable();
        checkinpassengerjoin();
    }, []);

    return (
        <Fragment>

            {/*Crew table*/}
            <h2 className="text-center mt-5">Passenger</h2>
            {" "}
            <div className = "container text-center">
                <Inputpassengertable />
            </div>
            <div className = "scroll">
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>ticket_no</th>
                            <th>seat_no</th>
                            <th>passenger_firstname</th>
                            <th>passenger_lastname</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                <tbody>
                    {passengerz.map(passenger => (
                        <tr key={passenger.ticket_no, passenger.seat_no}>
                            <td>{passenger.ticket_no}</td>
                            <td>{passenger.seat_no}</td>
                            <td>{passenger.passenger_firstname}</td>
                            <td>{passenger.passenger_lastname}</td>
                            <td><EditPassengerTable passengers = {passenger} /></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {/*Crew table*/}
            <h2 className="text-center mt-5">Passengers/Checkin</h2>
            <div className = "scroll">
                <table className="table mt-5 text-center">
                    <thead>
                        <tr>
                            <th>ticket_no</th>
                            <th>flight_id</th>
                            <th>no_of_bags</th>
                            <th>seat_no</th>
                            <th>passenger_firstname</th>
                            <th>passenger_lastname</th>
                        </tr>
                    </thead>
                <tbody>
                    {checkinpassengerjoins.map(passengercheckin => (
                        <tr key={passengercheckin.ticket_no, passengercheckin.seat_no}>
                            <td>{passengercheckin.ticket_no}</td>
                            <td>{passengercheckin.flight_id}</td>
                            <td>{passengercheckin.no_of_bags}</td>
                            <td>{passengercheckin.seat_no}</td>
                            <td>{passengercheckin.passenger_firstname}</td>
                            <td>{passengercheckin.passenger_lastname}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default Listpassenger;