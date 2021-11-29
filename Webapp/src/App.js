import React, { Fragment } from 'react';
import './App.css';

//components 

import ListFlightTable from './components/ListFlightTable';
import Trasactions from './components/Trasactions';
import ListAirplaneTable from './components/ListAirplane';
import Tabs from "./components/tabs.js";
import ListCrew from './components/ListCrewTable';
import ListCheckin from './components/ListCheckin';
import Listpassenger from './components/Listpassenger';

function App() {
  return ( 
  <Fragment>
    <h1 className="text-center mt-5">COSC3380 Team 2 Target 3</h1>
    <div>
      <Tabs>
        <div label="Flight Info">
          <ListFlightTable />
          <Trasactions />
        </div>
        <div label="Airplane">
          <ListAirplaneTable />
          <Trasactions />
        </div>
        <div label="Crew">
          <ListCrew />
          <Trasactions />
        </div>
        <div label="Check In">
          <ListCheckin />
          <Trasactions />
        </div>
        <div label="Passengers">
          <Listpassenger />
          <Trasactions />
        </div>
        <div label="Info">
          
        </div>
      </Tabs>
    </div>
  </Fragment>
  );
}

export default App;
