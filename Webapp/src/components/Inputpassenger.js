import React, { Fragment, useState } from "react";

const Inputpassengertable = () => {
    
    const [ticket_no, setticket_no] = useState();
    const [seat_no, setseat_no] = useState();
    const [passenger_firstname, setpassengers_firstname] = useState();
    const [passenger_lastname, setpassengers_lastname] = useState();
    

    const create_passenger = async(e) => {
        e.preventDefault();
        try {
            const body = { ticket_no, seat_no, passenger_lastname, passenger_firstname };
            const response = await fetch("http://localhost:5001/passenger", {
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
            <button type="button" class="btn btn-success" data-toggle="modal" 
            data-target="#myModal5">
                Input New Passenger
            </button>

            <div class="modal" id="myModal5">
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Create New Passenger</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body mt-5 text-center">
                    <h6>ticket_no (Should be a valid FK for checkin)</h6>
                    <input type="number"
                    className="form-control" 
                    value={ticket_no}
                    onChange={e => setticket_no(e.target.value)} />

                    <h6>seat_no</h6>
                    <input type="number" 
                    className="form-control"
                    value={seat_no}
                    onChange={e => setseat_no(e.target.value)} />
                
                    <h6>passenger_firstname</h6>
                    <input type="text" 
                    className="form-control"
                    value={passenger_firstname}
                    onChange={e => setpassengers_firstname(e.target.value)} />

                    <h6>passenger_lastname</h6>
                    <input type="text" 
                    className="form-control"
                    value={passenger_lastname}
                    onChange={e => setpassengers_lastname(e.target.value)} />
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-success" 
                        data-dismiss="modal" 
                        onClick = {e => create_passenger(e)}>Create</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default Inputpassengertable;