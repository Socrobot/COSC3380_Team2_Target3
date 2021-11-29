import React, { Fragment, useState } from "react";

const InputCheckinTable = () => {
    
    const [flight_id, setFlight_id] = useState();
    const [ticket_no, setticket_no] = useState();
    const [no_of_bags, setno_of_bags] = useState();
    

    const create_checkin = async(e) => {
        e.preventDefault();
        try {
            const body = { flight_id, ticket_no, no_of_bags };
            const response = await fetch("http://localhost:5001/checkin", {
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
            data-target="#myModal4">
                Input New Checkin
            </button>

            <div class="modal" id="myModal4">
            <div class="modal-dialog">
                <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Create New Checkin</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body mt-5 text-center">
                    <h6>flight_id (Should be in valid FK for flight)</h6>
                    <input type="text"
                    placeholder = "EX: abc1"
                    className="form-control" 
                    value={flight_id}
                    onChange={e => setFlight_id(e.target.value)} />

                    <h6>ticket_no</h6>
                    <input type="number" 
                    className="form-control"
                    value={ticket_no}
                    onChange={e => setticket_no(e.target.value)} />
                
                    <h6>no_of_bags</h6>
                    <input type="number" 
                    className="form-control"
                    value={no_of_bags}
                    onChange={e => setno_of_bags(e.target.value)} />
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-success" 
                        data-dismiss="modal" 
                        onClick = {e => create_checkin(e)}>Create</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default InputCheckinTable;