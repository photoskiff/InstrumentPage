import { Instrument, SalesPerson, Level } from "./model";

const instruments: Instrument[] = [
    { name: "VODLN", levels: [Level.Price, Level.Yield, Level.Spread] },
    { name: "AZN", levels: [Level.Price, Level.Spread] },
    { name: "SSE", levels: [Level.Price, Level.Yield] },
    { name: "TSCO", levels: [Level.Price, Level.Yield] },
    { name: "TSLA", levels: [Level.Price, Level.Yield] },
    { name: "BARC", levels: [Level.Price, Level.Yield] },
    { name: "LLOY", levels: [Level.Price, Level.Yield] },
    { name: "AMZN", levels: [Level.Price, Level.Yield] },
    { name: "AAPL", levels: [Level.Price, Level.Yield] },
    { name: "GOOG", levels: [Level.Price, Level.Yield] },

]

const salePersons: SalesPerson[] = [
    { name: "J.Smith" },
    { name: "R.Green" },
    { name: "N.Good" },
    { name: "S.Simmons" },
    { name: "K.Ravel" },
]

export const loadInstruments = (): Promise<Instrument[]> => {
    let promise = new Promise<Instrument[]>((resolve, reject) => {
        setTimeout(() => {
          resolve(instruments);
        }, 2000)
      });
    return promise;
}

export const loadSalePersons = (): Promise<SalesPerson[]> => {
    let promise = new Promise<SalesPerson[]>((resolve, reject) => {
        setTimeout(() => {
          resolve(salePersons);
        }, 1000)
      });
    return promise;
}