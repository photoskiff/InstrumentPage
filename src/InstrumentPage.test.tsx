import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { loadInstrumentsFast, loadSalePersonsFast } from "./service/services";
import { InstrumentPage } from "./InstrumentPage";
import { instruments, salePersons } from "./model/sampleData"


describe("instrument page tests", () => {
    describe("initialization tests", () => {
        it("should have some controls disabled if no salesPersons", () => {
            render(<InstrumentPage instruments={instruments} salesPersons={[]}/>)
        })
        it("should have some controls disabled if no instruments", () => {
            const table = render(<InstrumentPage instruments={[]} salesPersons={salePersons}/>);
            const inputs = table.getAllByRole("textbox");
            expect(inputs.length).toEqual(2);
            inputs.map(i => expect(i).toBeDisabled())
        })
        it("should have all disabled controls if no data", () => {
            render(<InstrumentPage instruments={[]} salesPersons={[]}/>)
        })
    })
    describe("behaviour tests", () => {
        it("should clear level on level type change", () => {
            const table = render(<InstrumentPage instruments={instruments} salesPersons={salePersons}/>);
            const instr = table.getByTestId("instrument-select");
            expect(instr).toHaveTextContent(/vodln/i);
        })
    })
})