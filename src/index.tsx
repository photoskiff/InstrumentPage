import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { loadInstruments, loadSalePersons,  } from "./service/services";
import { loadInstrumentsFast, loadSalePersonsFast } from "./service/services";



ReactDOM.render(
  <React.StrictMode>
    <App salesPersonsLoader={loadSalePersonsFast} instrumentLoader={loadInstrumentsFast}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
