import React, { Fragment, useState } from "react";

const Editcrewtable = ({ crew }) => {

    const [flight_id, setflight_id] = useState(crew.flight_id);
    const [crew_id, setcrew_id] = useState(crew.crew_id);
    const [crew_firstname, setcrew_firstname] = useState(crew.crew_firstname);
    const [crew_lastname, setcrew_lastname] = useState(crew.crew_lastname);

    //edit function

    const updatecrew = async(c) => {
        c.preventDefault();
        try {
            const body = { flight_id, crew_id, crew_firstname, crew_lastname };
            const response = await fetch(`http://localhost:5001/crew/${crew.flight_id}*${crew.crew_id}`, {
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
        data-target={`#id${crew.flight_id}${crew.crew_id}`}>
            Edit
        </button>

        <div className="modal" id={`id${crew.flight_id}${crew.crew_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Crew {crew.flight_id} {crew.crew_id}</h4>
                        <button type="button" className="close" 
                        data-dismiss="modal"
                        onClick = {() => (setflight_id(crew.flight_id), 
                            setcrew_id(crew.crew_id),
                            setcrew_firstname(crew.crew_firstname),
                            setcrew_lastname(crew.crew_lastname))}>&times;</button>
                    </div>
        
                    <div className="modal-body">
                        <h6>flight_id</h6>
                        <input type="text" className="form-control" 
                        value={flight_id}
                        onChange= {c => setflight_id(c.target.value)} />
                        
                        <h6>crew_id</h6>
                        <input type="text" className="form-control" 
                        value={crew_id}
                        onChange= {c => setcrew_id(c.target.value)} />
                        
                        <h6>crew_firstname</h6>
                        <input type="text" className="form-control" 
                        value={crew_firstname}
                        onChange= {c => setcrew_firstname(c.target.value)} />

                        <h6>crew_lastname</h6>
                        <input type="text" className="form-control" 
                        value={crew_lastname}
                        onChange= {c => setcrew_lastname(c.target.value)} />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" 
                        data-dismiss="modal" 
                        onClick = {c => (updatecrew(c))}>Edit</button>
                        <button type="button" className="btn btn-danger" 
                        data-dismiss="modal"
                        onClick = {() => (setflight_id(crew.flight_id), 
                            setcrew_id(crew.crew_id),
                            setcrew_firstname(crew.crew_firstname),
                            setcrew_lastname(crew.crew_lastname))}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
}

export default Editcrewtable;