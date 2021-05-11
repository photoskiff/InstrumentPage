import { Button, Select } from "antd";
import 'antd/dist/antd.css'
import React, { useCallback, useEffect, KeyboardEvent, ChangeEvent, useState } from "react"
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';
import { SalesPerson, Instrument, Level } from "./model";
import { loadInstruments, loadSalePersons } from "./services";

type PageState = {
    instrument?: Instrument,
    salesPerson?: SalesPerson,
    instrumentLevel: Level,
    amount?: number,
}

const { Option: Opt } = Select;

export const InstrumentPage = () => {
    const [salesPersons, setSalesPersons] = useState<SalesPerson[]>([]);
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [{ instrument, instrumentLevel, salesPerson, amount }, setPageState] = useState<PageState>({ instrumentLevel: Level.Price });


    const fetchInstruments = useCallback(async () => setInstruments(await loadInstruments()), []);
    const fetchSalePersons = useCallback(async () => setSalesPersons(await loadSalePersons()), []);

    useEffect(() => {
        setInputValue("");
    }, [instrument, instruments])

    useEffect(() => {
        const instrument = instruments.length ? instruments[0] : undefined;
        const salesPerson = salesPersons.length ? salesPersons[0] : undefined;
        const state: PageState = {
            instrument,
            salesPerson,
            instrumentLevel: Level.Price,
            amount: undefined
        };
        setPageState(() => state);
    }, [salesPersons, instruments])

    useEffect(() => {
        fetchInstruments();
        fetchSalePersons();
    }, [fetchInstruments, fetchSalePersons])

    const instrumentChanged = (v: Option) => {
        const instr = instruments.find(i => i.name === v.value);
        const level = instr?.levels[0] ?? Level.Price;
        setPageState(s => ({ ...s, instrument: instr, instrumentLevel: level }))
    }

    const levelChanged = (v: string) => {
        const level = +v;
        setInputValue("");
        setPageState(s => ({ ...s, instrumentLevel: level }));
    }

    const salePersonChanged = (v: Option) => {
        const person = salesPersons.find(i => i.name === v.value);
        setPageState(s => ({ ...s, salesPerson: person }));
    }

    const reportState = () => {
        const replacer = (key: any, val: any) => {
            if (key === "instrumentLevel") return `${Level[val]} (${val})`;
            if (key === "levels") return val.map((v: any) => `${Level[v]} (${v})`);
            return val;
        };
        console.log(JSON.stringify({ instrument, instrumentLevel, salesPerson, amount }, replacer, 2));
    }

    const AntdLevelOption = (l: Level) => {
        const value = l.toString();
        return <Opt key={value} value={value}>{`${Level[l]} (${l})`}</Opt>
    }

    const tryChangeLevel = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        const level = +e.target.value;
        level && instrument?.levels.some(l => l === level) && setPageState(s => ({ ...s, instrumentLevel: level }));
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setInputValue("");
        }
    }

    const tryChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const val = +e.target.value;
        if (typeof (val) !== 'number' || Number.isNaN(val) || val < 0) return;
        setPageState({ instrument, instrumentLevel, salesPerson, amount: val });
    }

    const tryClearAmount = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setPageState({ instrument, instrumentLevel, salesPerson, amount: undefined });
        }
    }

    return (<div>
        <div className='row'>
            <div>
                <Dropdown options={instruments.map(i => i.name)} onChange={instrumentChanged} 
                value={instrument?.name} placeholder="select an instrument" />
                
            </div>
            <div>
                <Dropdown options={salesPersons.map(p => p.name)} onChange={salePersonChanged} value={salesPerson?.name} placeholder="select a sales person" />
            </div>
            <div>

                <input placeholder="enter level" onChange={tryChangeLevel} value={inputValue} onKeyDown={handleKeyDown} />
            </div>
            <div>
                <Select size="middle" style={{ width: 120 }} onChange={levelChanged} showSearch
                    placeholder="Instr Level"
                    defaultValue={Level.Price.toString()}
                    value={instrumentLevel.toString()}
                    filterOption={(input, option) =>
                        option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>

                    {instrument?.levels.map(l => AntdLevelOption(l)) ?? [AntdLevelOption(Level.Price)]}
                </Select>


            </div>
        </div>
        <p/>
        <input placeholder='enter amount' value={amount ?? ""} onChange={tryChangeAmount} onKeyDown={tryClearAmount} />
        <p/>
        <Button type="primary" style={{ marginLeft: 8 }} onClick={reportState} disabled={!instrument || !instrumentLevel || !salesPerson || !amount}>
            submit
        </Button>
    </div>)
}