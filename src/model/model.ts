export type SalesPerson = {
    name: string,
    id: number,
}

export enum Level {
    Price, Yield, Spread
}

export interface Instrument {
    name: string,
    levels: Level[]
}


