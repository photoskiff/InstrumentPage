export type SalesPerson = {
    name: string
}

export enum Level {
    Price, Yield, Spread
}

export interface Instrument {
    name: string,
    levels: Level[]
}


