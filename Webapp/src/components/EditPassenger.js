import React, { Fragment, useState } from "react";

const EditPassengerTable = ({ passengers }) => {

    const [ticket_no, setticket_no] = useState(passengers.ticket_no);
    const [seat_no, setseat_no] = useState(passengers.seat_no);
    const [passenger_firstname, setpassengers_firstname] = useState(passengers.passenger_firstname);
    const [passenger_lastname, setpassengers_lastname] = useState(passengers.passenger_lastname);

    //edit function

    const updatepassenger = async(c) => {
        c.preventDefault();
        try {
            const body = { ticket_no, seat_no, passenger_lastname, passenger_firstname };
            const response = await fetch(`http://localhost:5001/passenger/${passengers.ticket_no}*${passengers.seat_no}`, {
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
        className="btn btn-warning" 
        data-toggle="modal" 
        data-target={`#id${passengers.ticket_no}${passengers.seat_no}`}>
            Edit
        </button>

        <div className="modal" id={`id${passengers.ticket_no}${passengers.seat_no}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Passenger With Ticket {passengers.ticket_no}</h4>
                        <button type="button" className="close" 
                        data-dismiss="modal"
                        onClick = {() => (setpassengers_firstname(passengers.passenger_firstname), 
                            setpassengers_lastname(passengers.passenger_lastname))}>&times;</button>
                    </div>
        
                    <div className="modal-body">
                        <h6>ticket_no</h6>
                        <input type="number" className="form-control" 
                        value={ticket_no}
                        onChange= {c => setticket_no(c.target.value)} />
                        
                        <h6>seat_no</h6>
                        <input type="number" className="form-control" 
                        value={seat_no}
                        onChange= {c => setseat_no(c.target.value)} />
                        
                        <h6>passenger_firstname</h6>
                        <input type="text" className="form-control" 
                        value={passenger_firstname}
                        onChange= {c => setpassengers_firstname(c.target.value)} />
                    
                    <h6>passenger_lastname</h6>
                        <input type="text" className="form-control" 
                        value={passenger_lastname}
                        onChange= {c => setpassengers_lastname(c.target.value)} />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" 
                        data-dismiss="modal" 
                        onClick = {c => (updatepassenger(c))}>Edit</button>
                        <button type="button" className="btn btn-danger" 
                        data-dismiss="modal"
                        onClick = {() => (setpassengers_firstname(passengers.passenger_firstname), 
                            setpassengers_lastname(passengers.passenger_lastname))}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
}

export default EditPassengerTable;