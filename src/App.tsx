import React from 'react';
import './App.css';
import { InstrumentPage,  } from './InstrumentPage';
import { loadInstruments, loadSalePersons } from "./services";

function App() {
  return (
    <div className="App-header">
      <h1>
        Instrument Page
      </h1>
      <InstrumentPage salesPersonsLoader={loadSalePersons} instrumentLoader={loadInstruments}/>
    </div>
  );
}

export default App;
