import React, { Fragment, useState } from "react";

const InputFlightTable = () => {
    
    const [flight_id, setFlight_id] = useState()
    const [airplane_code,setairplane_code] = useState()
    const [departure_time, setdeparture_time] = useState()
    const [arrival_time, setarrival_time] = useState()
    const [gate_no, setgate_no] = useState()
    const [airplane_status, setairplane_status] = useState()
    const [movie, setmovie_status] = useState()
    const [wifi, setwifi_status] = useState()
    const [food_beverage, setfood_beverage_status] = useState()
    
    const create_flight = async(e) => {
        e.preventDefault();
        try {
            const body = { flight_id, airplane_code, departure_time, arrival_time, gate_no, airplane_status };
            const response = await fetch("http://localhost:5001/flightTable", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    const create_inflight_offerings = async(e) => {
        e.preventDefault();
        try {
            const body = { flight_id, movie, wifi, food_beverage };
            const response = await fetch("http://localhost:5001/inflightOfferings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal">
                Input New Flight
            </button>

            <div className="modal" id="myModal">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Create New Flight</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body mt-5 text-center">
                    <h6>flight_id</h6>
                    <input type="text"
                    placeholder = "EX: abc1"
                    className="form-control" 
                    value={flight_id}
                    onChange={e => setFlight_id(e.target.value)} />

                    <h6>airplane_code</h6>
                    <input type="text" 
                    className="form-control"
                    placeholder = "EX: 123a" 
                    value={airplane_code}
                    onChange={e => setairplane_code(e.target.value)} />
                
                    <h6>departure_time</h6>
                    <input type="datetime-local" 
                    className="form-control" 
                    value={departure_time}
                    onChange={e => setdeparture_time(e.target.value)} />
                
                    <h6>arrival_time</h6>
                    <input type="datetime-local" 
                    className="form-control" 
                    value={arrival_time}
                    onChange={e => setarrival_time(e.target.value)} />
                
                    <h6>gate_no</h6>
                    <input type="number" 
                    className="form-control"
                    placeholder = "EX: 10"
                    value={gate_no}
                    onChange={e => setgate_no(e.target.value)} />

                    <h6>airplane_status</h6>
                    <input type="text" 
                    className="form-control"
                    placeholder = "EX: maintenance"
                    value={airplane_status}
                    onChange={e => setairplane_status(e.target.value)} />

                    <h6>movie</h6>
                    <input type="text" 
                    className="form-control"
                    placeholder = "EX: YES/NO"
                    value={movie}
                    onChange={e => setmovie_status(e.target.value)} />

                    <h6>wifi</h6>
                    <input type="text" 
                    className="form-control"
                    placeholder = "EX: YES/NO"
                    value={wifi}
                    onChange={e => setwifi_status(e.target.value)} />

                    <h6>food_beverage</h6>
                    <input type="text" 
                    className="form-control"
                    placeholder = "EX: YES/NO"
                    value={food_beverage}
                    onChange={e => setfood_beverage_status(e.target.value)} />
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-success" 
                        data-dismiss="modal" 
                        onClick = {e => (create_flight(e), create_inflight_offerings(e))}>Create</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default InputFlightTable;