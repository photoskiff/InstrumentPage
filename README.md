# Instrument Page

A live demo of this project can be found at
<br/>
http://www.photoblink.com/instruments

- after a submit button pressed users can see a console log (press F12 to see the console output) with all the submitted data presented in a tabular format
- in the design instrument and salesPeresons services are injected via service functions. Injecting loadInstruments and loadSalePersons will simulate 2 and 1 seconds loading of these data
```javascript
//uncomment to test slow loading
// import { loadInstruments, loadSalePersons,  } from "./service/services";
import { loadInstrumentsFast, loadSalePersonsFast } from "./service/services";

ReactDOM.render(
  <React.StrictMode>
    <App salesPersonsLoader={loadSalePersonsFast} instrumentLoader={loadInstrumentsFast}/>
  </React.StrictMode>,
  document.getElementById('root')
);```
