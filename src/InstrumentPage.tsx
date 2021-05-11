import { Button, Select, Input } from "antd";
import 'antd/dist/antd.css'
import React, { useCallback, useEffect, KeyboardEvent, ChangeEvent, useState } from "react"
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
    const [loading, setLoading] = useState([true, true]);

    const fetchInstruments = useCallback(async () => {
        setInstruments(await loadInstruments());
        setLoading(([_, s]) => [false, s]);
    }, []);

    const fetchSalePersons = useCallback(async () => {
        setSalesPersons(await loadSalePersons())
        setLoading(([i, _]) => [i, false]);
    }, []);

    const allLoading = () => loading[0] || loading[1];

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

    const instrumentChanged = (v: string) => {
        const instr = instruments.find(i => i.name === v);
        const level = instr?.levels[0] ?? Level.Price;
        setPageState(s => ({ ...s, instrument: instr, instrumentLevel: level }))
    }

    const levelChanged = (v: string) => {
        const level = +v;
        setInputValue("");
        setPageState(s => ({ ...s, instrumentLevel: level }));
    }

    const salePersonChanged = (v: string) => {
        const person = salesPersons.find(i => i.name === v);
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

    const InstrumentOption = (i: Instrument) => {
        return <Opt key={i.name} value={i.name}>{i.name}</Opt>
    }

    const SalesPersonOption = (p: SalesPerson) => {
        return <Opt key={p.name} value={p.name}>{p.name}</Opt>
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

    const filterOption = (input: string, option: any) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

    return (<div>
        <div className='row'>
            <div>
                <div className='label'>Instrument</div>
                <Select size="middle" style={{ width: 120 }} onChange={instrumentChanged} showSearch
                    placeholder="instrument"
                    value={instrument?.name}
                    filterOption={filterOption}>
                    {instruments.map(InstrumentOption)}
                    loading={loading[0]}
                </Select>
            </div>
            <div>
                <div className='label'>Sales Person</div>
                <div>
                    <Select size="middle" style={{ width: 120 }} onChange={salePersonChanged} showSearch
                        placeholder="instrument"
                        value={salesPerson?.name}
                        filterOption={filterOption}>
                        {salesPersons.map(SalesPersonOption)}
                        loading={loading[1]}
                    </Select>
                </div>
            </div>
            <div >
                <div className='label row compact' style={{justifyContent:"center"}}>Instrument Level</div>
                <div className='row compact'>
                    <div>
                        <Input disabled={loading[0]} placeholder="enter level" onChange={tryChangeLevel} value={inputValue} onKeyDown={handleKeyDown} />
                    </div>
                    <div>
                        <Select size="middle" style={{ width: 120 }} onChange={levelChanged}
                            loading={loading[0]}
                            defaultValue={Level.Price.toString()}
                            value={instrumentLevel.toString()}>
                            {instrument?.levels.map(l => AntdLevelOption(l)) ?? [AntdLevelOption(Level.Price)]}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='row' style={{ justifyContent: "center" }}>
                <Input disabled={allLoading()} placeholder='enter amount' value={amount && amount > 0 ? amount : ""} onChange={tryChangeAmount} onKeyDown={tryClearAmount} style={{ width: 200 }} />
            </div>
            <div className='row' style={{ justifyContent: "center" }}>
                <Button type="primary" onClick={reportState} disabled={!instrument || !instrumentLevel || !salesPerson || !amount}>
                    submit
                </Button>
            </div>
        </div>
    </div>)
}