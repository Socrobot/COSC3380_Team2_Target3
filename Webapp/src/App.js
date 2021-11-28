import React, { Fragment } from 'react';
import './App.css';

//components 

import InputFlightTable from './components/InputFlightTable';
import ListFlightTable from './components/ListFlightTable';
import Trasactions from './components/Trasactions';

function App() {
  return ( 
  <Fragment>
    <h1 className="text-center mt-5">COSC3380 Team 2 Target 3</h1>
    <div className = "container text-center">
      <InputFlightTable />
    </div>
    <div className = "container">
      <ListFlightTable />
      <Trasactions />
    </div>
  </Fragment>
  );
}

export default App;
