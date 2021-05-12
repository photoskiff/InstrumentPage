import { Instrument, SalesPerson, Level } from "./model";

export const instruments: Instrument[] = [
    { name: "VODLN", levels: [Level.Price, Level.Yield, Level.Spread] },
    { name: "AZN", levels: [Level.Price, Level.Spread] },
    { name: "SSE", levels: [Level.Price, Level.Yield] },
    { name: "TSCO", levels: [Level.Price, ] },
    { name: "TSLA", levels: [Level.Price, Level.Yield] },
    { name: "BARC", levels: [Level.Price, Level.Yield, Level.Spread] },
    { name: "LLOY", levels: [Level.Price, Level.Spread] },
    { name: "AMZN", levels: [Level.Price, Level.Yield, Level.Spread] },
    { name: "AAPL", levels: [Level.Price, Level.Yield, Level.Spread] },
    { name: "GOOG", levels: [Level.Price, Level.Yield, Level.Spread] },
]

export const salePersons: SalesPerson[] = [
    { name: "J.Smith", id: 1 },
    { name: "R.Green", id: 2 },
    { name: "N.Good", id: 3 },
    { name: "S.Simmons", id: 4 },
    { name: "K.Ravel", id: 5 },
]
