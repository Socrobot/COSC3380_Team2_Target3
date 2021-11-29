import React, { Fragment } from "react";

const Trasactions = () => {
    
        // Calling rollback transaction
        const rollBackTransaction = async() => {
            try {
                
                const response = await fetch("http://localhost:5001/rollback", {
                    method:"POST"
                });
                const jsonData = await response.json()
                
                window.location = "/";
            } catch (err) {
                console.error(err.message);
            }
        }

            // Calling commit transaction 
    const commitTransaction = async() => {
        try {
            
            const response = await fetch("http://localhost:5001/end", {
                method:"POST"
            });
            const jsonData = await response.json()

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    
    return(
        <Fragment>
            <button className="btn btn-danger" 
            onClick = {() => (rollBackTransaction(), alert('You have undone your changes!'))}>Undo Changes</button>
            <button className="btn btn-warning" 
            onClick = {() => (commitTransaction(), alert('You have commited your changes!'))}>Confirm Changes</button>
        </Fragment>
    )
}

export default Trasactions;