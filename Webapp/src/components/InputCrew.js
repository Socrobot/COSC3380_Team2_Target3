import React, { Fragment, useState } from "react";

const InputCrewTable = () => {
    
    const [flight_id, setFlight_id] = useState();
    const [crew_id, setcrew_id] = useState();
    const [crew_firstname, setcrew_firstname] = useState();
    const [crew_lastname, setcrew_lastname] = useState();
    

    const create_crew = async(e) => {
        e.preventDefault();
        try {
            const body = { flight_id, crew_id, crew_firstname, crew_lastname };
            const response = await fetch("http://localhost:5001/crew", {
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
            <button type="button" className="btn btn-success" data-toggle="modal" 
            data-target="#myModal3">
                Input New Crew
            </button>

            <div className="modal" id="myModal3">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Create New Crew Member</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body mt-5 text-center">
                    <h6>flight_id (Should be in valid FK for flight)</h6>
                    <input type="text"
                    placeholder = "EX: abc1"
                    className="form-control" 
                    value={flight_id}
                    onChange={e => setFlight_id(e.target.value)} />

                    <h6>crew_id</h6>
                    <input type="text" 
                    className="form-control"
                    placeholder = "EX: xyz1" 
                    value={crew_id}
                    onChange={e => setcrew_id(e.target.value)} />
                
                    <h6>crew_firstname</h6>
                    <input type="text" 
                    className="form-control"
                    placeholder = "EX: Wesley" 
                    value={crew_firstname}
                    onChange={e => setcrew_firstname(e.target.value)} />

                    <h6>crew_lastname</h6>
                    <input type="text" 
                    className="form-control"
                    placeholder = "EX: Koons" 
                    value={crew_lastname}
                    onChange={e => setcrew_lastname(e.target.value)} />
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-success" 
                        data-dismiss="modal" 
                        onClick = {e => create_crew(e)}>Create</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default InputCrewTable;