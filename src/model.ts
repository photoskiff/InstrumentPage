export type SalesPerson ={
    name: string
}

export enum Level{
    Price=1, Yield, Spread
}

export interface Instrument{
    name: string,
    levels: Level[]
}


