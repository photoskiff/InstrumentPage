import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { loadInstrumentsFast, loadSalePersonsFast } from "./service/services";
import { InstrumentPage } from "./InstrumentPage";
import { instruments, salePersons } from "./model/sampleData"


describe("instrument page tests", () => {
    describe("initialization tests", () => {
        it("should have disabled controls", () => {
            render(<InstrumentPage instruments={[]} salesPersons={[]}/>)
        })
    })
})