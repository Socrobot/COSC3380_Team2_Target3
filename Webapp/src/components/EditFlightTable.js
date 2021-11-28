import React, { Fragment, useState } from "react";

const EditFlightTable = ({ flight }) => {
    const [flight_id, setFlight_id] = useState(flight.flight_id)
    const [airplane_code,setairplane_code] = useState(flight.airplane_code)
    const [departure_time, setdeparture_time] = useState(flight.departure_time)
    const [arrival_time, setarrival_time] = useState(flight.arrival_time)
    const [gate_no, setgate_no] = useState(flight.gate_no)
    const [airplane_status, setairplane_status] = useState(flight.airplane_status)
    const [movie, setmovie_status] = useState(flight.movie)
    const [wifi, setwifi_status] = useState(flight.wifi)
    const [food_beverage, setfood_beverage_status] = useState(flight.food_beverage)

    //edit function

    const updateFlights = async(e) => {
        e.preventDefault();
        try {
            const body = { flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status };
            const response = await fetch(`http://localhost:5001/flightTable/${flight.flight_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    const updateInflightOfferings = async(a) => {
        a.preventDefault();
        try {
            const body = { flight_id, movie, wifi, food_beverage};
            const response = await fetch(`http://localhost:5001/inflightOfferings/${flight.flight_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
        <button type="button" 
        class="btn btn-warning" 
        data-toggle="modal" 
        data-target={`#id${flight.flight_id}`}>
            Edit
        </button>

        <div class="modal" id={`id${flight.flight_id}`} 
        onClick = {() => (setFlight_id(flight.flight_id), 
            setairplane_code(flight.airplane_code))}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Flight {flight.flight_id}</h4>
                        <button type="button" class="close" 
                        data-dismiss="modal"
                        onClick = {() => (setFlight_id(flight.flight_id), 
                            setairplane_code(flight.airplane_code), 
                            setgate_no(flight.gate_no),
                            setdeparture_time(flight.departure_time),
                            setarrival_time(flight.arrival_time),
                            setairplane_status(flight.airplane_status))}>&times;</button>
                    </div>
        
                    <div class="modal-body">
                    <h6>airplane_code</h6>
                        <input type="text" className="form-control" 
                        value={flight_id}
                        onChange= {e => setFlight_id(e.target.value)} />

                        <h6>airplane_code</h6>
                        <input type="text" className="form-control" 
                        value={airplane_code}
                        onChange= {e => setairplane_code(e.target.value)} />

                        <h6>departure_time</h6>
                        <input type="datetime-local" className="form-control" 
                        value={departure_time}
                        onChange= {e => setdeparture_time(e.target.value)} />

                        <h6>arrival_time</h6>
                        <input type="datetime-local" className="form-control" 
                        value={arrival_time}
                        onChange= {e => setarrival_time(e.target.value)} />

                        <h6>gate_no</h6>
                        <input type="number" className="form-control" 
                        value={gate_no}
                        onChange= {e => setgate_no(e.target.value)} />
                        
                        <h6>airplane_status</h6>
                        <input type="text" className="form-control" 
                        value={airplane_status}
                        onChange= {e => setairplane_status(e.target.value)} />

                        <h6>movie</h6>
                        <input type="text" className="form-control" 
                        value={movie}
                        onChange= {e => setmovie_status(e.target.value)} />

                        <h6>wifi</h6>
                        <input type="text" className="form-control" 
                        value={wifi}
                        onChange= {e => setwifi_status(e.target.value)} />

                        <h6>food_beverage</h6>
                        <input type="text" className="form-control" 
                        value={food_beverage}
                        onChange= {e => setfood_beverage_status(e.target.value)} />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" 
                        data-dismiss="modal" 
                        onClick = {e => (updateFlights(e), updateInflightOfferings(e))}>Edit</button>
                        <button type="button" class="btn btn-danger" 
                        data-dismiss="modal"
                        onClick = {() => (setFlight_id(flight.flight_id), 
                        setairplane_code(flight.airplane_code), 
                        setgate_no(flight.gate_no),
                        setdeparture_time(flight.departure_time),
                        setarrival_time(flight.arrival_time),
                        setairplane_status(flight.airplane_status))}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
}

export default EditFlightTable;