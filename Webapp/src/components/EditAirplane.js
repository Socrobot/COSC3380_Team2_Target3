import React, { Fragment, useState } from "react";

const EditAirplaneTable = ({ airplane }) => {

    const [airplane_code,setairplane_code] = useState(airplane.airplane_code)
    const [airplane_capacity, setairplane_capacity] = useState(airplane.airplane_capacity)
    const [airplane_model, setairplane_model] = useState(airplane.airplane_model)

    //edit function

    const updateAirplane = async(c) => {
        c.preventDefault();
        try {
            const body = { airplane_code, airplane_model, airplane_capacity };
            const response = await fetch(`http://localhost:5001/airplane/${airplane.airplane_code}`, {
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
        data-target={`#id${airplane.airplane_code}`}>
            Edit
        </button>

        <div class="modal" id={`id${airplane.airplane_code}`} 
        onClick = {() => (setairplane_code(airplane.airplane_code), 
            setairplane_model(airplane.airplane_model))}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Airplane {airplane.airplane_code}</h4>
                        <button type="button" class="close" 
                        data-dismiss="modal"
                        onClick = {() => (setairplane_code(airplane.airplane_code), 
                            setairplane_model(airplane.airplane_model),
                            setairplane_capacity(airplane.airplane_capacity))}>&times;</button>
                    </div>
        
                    <div class="modal-body">
                        <h6>airplane_code</h6>
                        <input type="text" className="form-control" 
                        value={airplane_code}
                        onChange= {c => setairplane_code(c.target.value)} />
                        
                        <h6>airplane_model</h6>
                        <input type="text" className="form-control" 
                        value={airplane_model}
                        onChange= {c => setairplane_model(c.target.value)} />
                        
                        <h6>airplane_capacity</h6>
                        <input type="number" className="form-control" 
                        value={airplane_capacity}
                        onChange= {c => setairplane_capacity(c.target.value)} />
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" 
                        data-dismiss="modal" 
                        onClick = {c => (updateAirplane(c))}>Edit</button>
                        <button type="button" class="btn btn-danger" 
                        data-dismiss="modal"
                        onClick = {() => (setairplane_code(airplane.airplane_code), 
                            setairplane_model(airplane.airplane_model),
                            setairplane_capacity(airplane.airplane_capacity))}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
}

export default EditAirplaneTable;