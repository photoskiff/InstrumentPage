import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { InstrumentPage, } from './InstrumentPage';
import { Instrument, SalesPerson } from './model/model';

export type Loaders = {
  instrumentLoader: () => Promise<Instrument[]>,
  salesPersonsLoader: () => Promise<SalesPerson[]>,
}

function App({ instrumentLoader, salesPersonsLoader }: Loaders) {
  const [salesPersons, setSalesPersons] = useState<SalesPerson[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  const fetchInstruments = useCallback(async () => {
    const instr = await instrumentLoader();
    setInstruments(instr);
  }, [instrumentLoader]);

  const fetchSalePersons = useCallback(async () => {
    const sp = await salesPersonsLoader();
    setSalesPersons(sp);
  }, [salesPersonsLoader]);

  useEffect(() => {
    fetchInstruments();
    fetchSalePersons();
  }, [fetchInstruments, fetchSalePersons])

  return (
    <div className="App-header">
      <h1>
        Instrument Page
      </h1>
      <InstrumentPage salesPersons={salesPersons} instruments={instruments} />
    </div>
  );
}

export default App;
