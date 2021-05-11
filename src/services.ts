import { Instrument, SalesPerson, Level } from "./model";

const instruments: Instrument[] = [
    { name: "VODLN", levels: [Level.Price, Level.Yield, Level.Spread] },
    { name: "AZN", levels: [Level.Price, Level.Spread] },
    { name: "SSE", levels: [Level.Price, Level.Yield] },

]

const salePersons: SalesPerson[] = [
    { name: "J.Smith" },
    { name: "R.Green" },
    { name: "N.Good" }
]

export const loadInstruments = (): Promise<Instrument[]> => {
    return Promise.resolve(instruments);
}

export const loadSalePersons = (): Promise<SalesPerson[]> => {
    return Promise.resolve(salePersons);
}