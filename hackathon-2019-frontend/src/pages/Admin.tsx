import React from 'react';
import {NavigationObject} from '../App';
import Select from "react-select";

interface AdminProps {
    match: any;
}
interface AdminState {data: {asset: string, type: number}[]}
interface ActionType {type: number, label: string};
const AssetTypes: ActionType[] = [
    { type: 1, label: 'IP' },
    { type: 2, label: 'Domain' },
    { type: 3, label: 'Email' },
];

export default class Admin extends React.Component<AdminProps, AdminState> {
    private _isMounted: boolean = false;
    static readonly nav: NavigationObject = {path: '/admin', displayName: 'Admin', description: 'Configure the mapping etc.'};

    constructor(props: AdminProps) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        this._isMounted = true;
        const URL = 'http://getsec.eu:8000/api/v1/assets/?format=json';
        fetch(URL)
            .then(response => response.json())
            .then(result => this.mountedSetState({data: result}))
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    mountedSetState = (state: {}) => this._isMounted && this.setState(state);

    render(): React.ReactNode {
        return (
            <div className="Admin">
                <div className="DataRow">
                    <div className="DataRowCell">Assets (IP, Domain or Email)</div>
                </div>
                {this.state.data.map((el, key) => (
                    <div key={key} className="DataRow">
                        <Select
                            onKeyDown={e => e.keyCode === 9 || e.preventDefault()}
                            className="select-component-root"
                            value={AssetTypes[el.type - 1]}
                            onChange={(item: any) => this.changeType(key, item)}
                            options={AssetTypes}
                        />
                        <input
                            autoFocus={!key}
                            value={el.asset}
                            placeholder={`# ${key + 1}`}
                            onChange={e => this.changeValue(key, e.target.value)}
                        />
                        <input type="submit" className="button red" value="Remove asset" onClick={() => this.removeAsset(key)}/>
                    </div>
                ))}
                <div className="DataRow">
                    <input type="submit" className="button green" value="Add asset" onClick={this.addAsset}/>
                    <input type="submit" className="button blue" value="Update" onClick={this.pushAssets}/>
                </div>
            </div>
        );
    }

    private changeValue(key: number, value: string) {
        const data = this.state.data;
        data[key].asset = value;
        this.mountedSetState(data);
    }

    private pushAssets = () => {
        const body = JSON.stringify(this.state.data.map(el => ({asset: el.asset, type: el.type})));
        console.log(body);
        if (this.state.data.length) {
            fetch('http://getsec.eu:8000/api/v1/assets', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: body,
            }).catch(console.log);
        }
    }

    private addAsset = () => {
        const data = this.state.data;
        data.push({asset: '', type: 1});
        this.mountedSetState(data);
    }

    private removeAsset = (key: number) => {
        this.mountedSetState({data: this.state.data.filter((_, i) => i !== key)});
    }

    private changeType = (key: number, item: ActionType) => {
        const data = this.state.data;
        data[key].type = item.type;
        this.mountedSetState(data);
    }
}
