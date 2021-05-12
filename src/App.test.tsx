import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { loadInstruments, loadSalePersons, loadInstrumentsFast, loadSalePersonsFast } from "./service/services";
import { act } from 'react-dom/test-utils';


describe("app tests", () => {
  test('renders title', () => {
    // act(() => {
    //   render(<App salesPersonsLoader={loadSalePersonsFast} instrumentLoader={loadInstrumentsFast} />);
    // });
    // const linkElement = screen.getByText(/instrument page/i);
    // expect(linkElement).toBeInTheDocument();
  });

})
