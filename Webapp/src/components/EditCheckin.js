import React, { Fragment, useState } from "react";

const Editcheckin = ({ checkin }) => {

    const [flight_id, setFlight_id] = useState(checkin.flight_id);
    const [ticket_no, setticket_no] = useState(checkin.ticket_no);
    const [no_of_bags, setno_of_bags] = useState(checkin.no_of_bags);


    //edit function

    const updatecheckin = async(c) => {
        c.preventDefault();
        try {
            const body = { flight_id, ticket_no, no_of_bags };
            const response = await fetch(`http://localhost:5001/checkin/${checkin.flight_id}*${checkin.ticket_no}`, {
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
        data-target={`#id${checkin.flight_id}${checkin.ticket_no}`}>
            Edit
        </button>

        <div class="modal" id={`id${checkin.flight_id}${checkin.ticket_no}`} 
        onClick = {() => (setFlight_id(checkin.flight_id))}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Checkin {checkin.flight_id} {checkin.crew_id}</h4>
                        <button type="button" class="close" 
                        data-dismiss="modal"
                        onClick = {() => (setFlight_id(checkin.flight_id))}>&times;</button>
                    </div>
        
                    <div class="modal-body">
                        <h6>flight_id</h6>
                        <input type="text" className="form-control" 
                        value={flight_id}
                        onChange= {c => setFlight_id(c.target.value)} />
                        
                        <h6>ticket_no</h6>
                        <input type="number" className="form-control" 
                        value={ticket_no}
                        onChange= {c => setticket_no(c.target.value)} />
                        
                        <h6>no_of_bags</h6>
                        <input type="number" className="form-control" 
                        value={no_of_bags}
                        onChange= {c => setno_of_bags(c.target.value)} />

                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" 
                        data-dismiss="modal" 
                        onClick = {c => (updatecheckin(c))}>Edit</button>
                        <button type="button" class="btn btn-danger" 
                        data-dismiss="modal"
                        onClick = {() => (setFlight_id(checkin.flight_id))}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </Fragment>
    );
}

export default Editcheckin;