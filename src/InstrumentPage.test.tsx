import React from 'react';
import { createEvent, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { loadInstrumentsFast, loadSalePersonsFast } from "./service/services";
import { InstrumentPage } from "./InstrumentPage";
import { instruments, salePersons } from "./model/sampleData"
import userEvent from '@testing-library/user-event';


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
        it("should initially show placeholders for instrument and sales person", () => {
            const table = render(<InstrumentPage instruments={instruments} salesPersons={salePersons}/>);
            const instr = table.getByTestId("instrument-select");
            const sp = table.getByTestId("sales-person-select");
            expect(instr).toHaveTextContent(/instrument/i); 
            expect(sp).toHaveTextContent(/sales person/i); 
        })
        it("should initially show Price level type", () => {
            const table = render(<InstrumentPage instruments={instruments} salesPersons={salePersons}/>);
            const level = table.getByTestId("level-type-select");
            expect(level).toHaveTextContent(/price/i); 
        })
    })
    describe("behaviour tests", () => {
        it("should only accept numeric calues for inputs", async () => {
            const table = render(<InstrumentPage instruments={instruments} salesPersons={salePersons}/>);
            const levelInput = table.getByTestId("level-input");
            const amountInput = table.getByTestId("amount-input");
            expect(levelInput).toHaveValue("");
            await waitFor(() => userEvent.type(levelInput, "5abc"));
            await waitFor(() => userEvent.type(amountInput, "abc8"));
            expect(levelInput).toHaveValue("5");
            expect(amountInput).toHaveValue("8");
        })
        it("should clear level on level type change", async () => {
            const table = render(<InstrumentPage instruments={instruments} salesPersons={salePersons}/>);
            const levelType = table.getByTestId("level-type-select");
            const levelInput = table.getByTestId("level-input");
            await waitFor(() => userEvent.type(levelInput, "5"));
            expect(levelInput).toHaveValue("5");
            fireEvent.change(levelType, "2");
            // expect(levelType).toHaveTextContent(/spread/i);
            // expect(levelInput).toHaveValue("");

        })
    })
})