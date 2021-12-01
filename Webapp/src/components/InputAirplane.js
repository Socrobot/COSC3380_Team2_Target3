import React, { Fragment, useState } from "react";

const InputAirplaneTable = () => {
    
    const [airplane_code, setairplane_code] = useState();
    const [airplane_model, setairplane_model]= useState();
    const [airplane_capacity, setairplane_capacity] = useState();

    const create_airplane = async(e) => {
        e.preventDefault();
        try {
            const body = { airplane_code, airplane_model, airplane_capacity };
            const response = await fetch("http://localhost:5001/airplane", {
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
            <button type="button" className="btn btn-success" data-toggle="modal" data-target="#myModal2">
                Input New Flight
            </button>

            <div className="modal" id="myModal2">
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Create New Flight</h4>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div className="modal-body mt-5 text-center">
                    <h6>airplane_code</h6>
                    <input type="text" 
                    className="form-control"
                    placeholder = "EX: 123a" 
                    value={airplane_code}
                    onChange={e => setairplane_code(e.target.value)} />
                    
                    <h6>airplane_model</h6>
                    <input type="text"
                    placeholder = "EX: Boeing C32"
                    className="form-control" 
                    value={airplane_model}
                    onChange={e => setairplane_model(e.target.value)} /> 
                
                    <h6>airplane_capacity</h6>
                    <input type="number" 
                    className="form-control" 
                    value={airplane_capacity}
                    onChange={e => setairplane_capacity(e.target.value)} />
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-success" 
                        data-dismiss="modal" 
                        onClick = {e => create_airplane(e)}>Create</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default InputAirplaneTable;