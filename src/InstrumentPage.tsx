import React, { useEffect, KeyboardEvent, ChangeEvent, useState } from "react"
import { Button, Select, Input } from "antd";
import 'antd/dist/antd.css'
import { SalesPerson, Instrument, Level } from "./model/model";

const { Option } = Select;

type PageProps = {
    salesPersons: SalesPerson[],
    instruments: Instrument[]
}

type PageState = {
    instrument?: Instrument,
    salesPerson?: SalesPerson,
    instrumentLevel: Level,
    levelInput?: number,
    amount?: number,
}


export const InstrumentPage = ({ salesPersons, instruments }: PageProps) => {
    const [{ instrument, instrumentLevel, salesPerson, amount, levelInput }, setPageState] = useState<PageState>({ instrumentLevel: Level.Price });
    const [loading, setLoading] = useState([true, true]);

    useEffect(() => {
        setLoading([instruments.length === 0, salesPersons.length === 0]);

    }, [salesPersons, instruments])


    const allLoading = () => loading[0] || loading[1];

    useEffect(() => {
        const instrument = instruments.length ? instruments[0] : undefined;
        const salesPerson = salesPersons.length ? salesPersons[0] : undefined;
        const state: PageState = {
            instrument,
            salesPerson,
            instrumentLevel: Level.Price,
        };
        setPageState(() => state);
    }, [salesPersons, instruments])



    const instrumentChanged = (v: string) => {
        const instr = instruments.find(i => i.name === v);
        const level = instr?.levels[0] ?? Level.Price;
        setPageState(s => ({ ...s, instrument: instr, instrumentLevel: level, levelInput: undefined }))
    }

    const levelChanged = (v: string) => {
        const level = +v;
        setPageState(s => ({ ...s, instrumentLevel: level, levelInput: undefined }));
    }

    const salePersonChanged = (v: string) => {
        const person = salesPersons.find(i => i.name === v);
        setPageState(s => ({ ...s, salesPerson: person }));
    }

    const reportState = () => {
        // const replacer = (key: any, val: any) => {
        //     if (key === "instrumentLevel") return Level[val];
        //     if (key === "levels") return val.map((v: any) => Level[v]);
        //     return val;
        // };
        // const data = JSON.stringify({ instrument, instrumentLevel, levelInput, salesPerson, amount }, replacer, 2)
        // console.log(data);
        const report = { Instrument: instrument?.name, "Level Type": Level[instrumentLevel], Level: levelInput, "Sales Person": salesPerson?.name, Amount: amount };
        console.table(report);
    }

    const AntdLevelOption = (l: Level) => {
        const value = l.toString();
        return <Option key={value} value={value}>{Level[l]}</Option>
    }

    const InstrumentOption = (i: Instrument) => {
        return <Option key={i.name} value={i.name}>{i.name}</Option>
    }

    const SalesPersonOption = (p: SalesPerson) => {
        return <Option key={p.name} value={p.name}>{p.name}</Option>
    }

    const tryChangeLevel = (e: ChangeEvent<HTMLInputElement>) => {
        const val = +e.target.value;
        if (typeof (val) !== 'number' || Number.isNaN(val) || val < 0) return;
        setPageState(s => ({ ...s, levelInput: val }));
    }

    const tryClearLevelInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setPageState(s => ({ ...s, levelInput: undefined }))
        }
    }

    const tryChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const val = +e.target.value;
        if (typeof (val) !== 'number' || Number.isNaN(val) || val < 0) return;
        setPageState(s => ({ ...s, amount: val }));
    }

    const tryClearAmount = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setPageState(s => ({ ...s, amount: undefined }));
        }
    }

    const filterOption = (input: string, option: any) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    const inputValue = (v: number | undefined) => v && v > 0 ? v : "";

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
                <div className='label row compact' style={{ justifyContent: "center" }}>Instrument Level</div>
                <div className='row compact'>
                    <div>
                        <Select size="middle" style={{ width: 120 }} onChange={levelChanged}
                            loading={loading[0]}
                            defaultValue={Level.Price.toString()}
                            value={instrumentLevel.toString()}>
                            {instrument?.levels.map(l => AntdLevelOption(l)) ?? [AntdLevelOption(Level.Price)]}
                        </Select>
                    </div>
                    <div>
                        <Input disabled={loading[0]} placeholder="enter lelel value" onChange={tryChangeLevel}
                            value={inputValue(levelInput)} onKeyDown={tryClearLevelInput} />
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div className='row' style={{ justifyContent: "center" }}>
                <Input disabled={allLoading()} placeholder='enter amount' value={inputValue(amount)} onChange={tryChangeAmount} onKeyDown={tryClearAmount} style={{ width: 200 }} />
            </div>
            <div className='row' style={{ justifyContent: "center" }}>
                <Button type="primary" onClick={reportState} disabled={!instrument || !salesPerson || !amount || !levelInput}>
                    submit
                </Button>
            </div>
        </div>
    </div>)
}