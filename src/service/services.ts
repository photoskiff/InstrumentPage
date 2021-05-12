import { Instrument, SalesPerson } from "../model/model";
import { instruments, salePersons} from "../model/sampleData"


export const loadInstruments = (): Promise<Instrument[]> => {
    let promise = new Promise<Instrument[]>(resolve => {
        setTimeout(() => {
          resolve(instruments);
        }, 2000)
      });
    return promise;
}

export const loadSalePersons = (): Promise<SalesPerson[]> => {
    let promise = new Promise<SalesPerson[]>(resolve => {
        setTimeout(() => {
          resolve(salePersons);
        }, 1000)
      });
    return promise;
}

export const loadInstrumentsFast = () => Promise.resolve(instruments);
export const loadSalePersonsFast = () => Promise.resolve(salePersons);