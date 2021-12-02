import React, { Fragment, useEffect, useState } from "react";

const Info = () => {

    const [transaction_sql_read, settransaction_sql_read] = useState([])
    const [query_sql_read, setquery_sql_read] = useState([])
    const [readme_read, setreadme_read] = useState([])

    // fetching transaction sql data
    const transaction_info = async() => {
        try {

            const response = await fetch("http://localhost:5001/transaction")
            const textData = await response.text();
            settransaction_sql_read(textData);

        } catch (err) {
            console.error(err.message);
        }
    };

    // fetching query sql data
    const query_info = async() => {
        try {
            
            const response = await fetch("http://localhost:5001/query")
            const textData = await response.text();
            setquery_sql_read(textData);
    
        } catch (err) {
            console.error(err.message);
        }
    };

    // fetching readme data
    const readme_info = async() => {
        try {
            
            const response = await fetch("http://localhost:5001/readme")
            const textData = await response.text();
            setreadme_read(textData);
    
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        transaction_info();
        query_info();
        readme_info();
    }, []);

    return (
        <Fragment>
            <h1>README</h1>
            <div className="p-3 my-3 bg-dark text-white scroll">
            <pre>{readme_read}</pre>
            </div>
            
            <h1>Transaction SQL</h1>
            <div className="p-3 my-3 bg-dark text-white scroll">
            <pre>{transaction_sql_read}</pre>
            </div>

            <h1>Query SQL</h1>
            <div className="p-3 my-3 bg-dark text-white scroll">
            <pre>{query_sql_read}</pre>
            </div>

            <h1>Group/Video</h1>
            <div className="p-3 my-3 bg-dark text-white scroll">
            <h3>Group Members</h3>
            <h4>Wesley Koons</h4>
            <h4>Alim Vasaya</h4>
            <h4>Chiemela Amaefule</h4>
            <h4>Dosbol Aliev</h4>


            <a href="https://youtu.be/D8lb_xKF_JE" target="_blank">Project Video</a>

            </div>

        </Fragment>
    );
}

export default Info;