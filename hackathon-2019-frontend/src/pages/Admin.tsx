import React from 'react';
import {NavigationObject} from '../App';
import Select from "react-select";

interface AdminProps {
    match: any;
}
interface AdminState {data: AssetObject[]}
interface ActionType {type: number, label: string}
const AssetTypes: ActionType[] = [
    { type: 1, label: 'IP' },
    { type: 2, label: 'Domain' },
    { type: 3, label: 'Email' },
];

interface AssetObject {
    id?: number,
    type: number,
    asset: string,
    status: undefined | 1 | 2 // undefined = not-modified, 1 = updated, 2 = new
}

export default class Admin extends React.Component<AdminProps, AdminState> {
    private _isMounted: boolean = false;
    static readonly nav: NavigationObject = {path: '/admin', displayName: 'Admin', description: 'Configure the mapping etc.'};

    constructor(props: AdminProps) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        this._isMounted = true;
        const URL = 'https://getsec.eu/api/v1/assets/?format=json';
        fetch(URL)
            .then(response => response.json())
            .then((result: AssetObject[]) => {
                this.mountedSetState({data: result})
            })
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }



    mountedSetState = (state: {}) => this._isMounted && this.setState(state);

    render(): React.ReactNode {
        console.log(this.state.data);
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
        if (!data[key].status) {
            data[key].status = 1;
        }
        this.mountedSetState(data);
    }

    private pushAssets = () => {
        this.state.data.filter(a => a.status).forEach(asset => {
            const body = JSON.stringify(asset);
            console.log(body);
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', 'Basic YWRtaW46dmllbnN2aWVucw==');

            if (asset.status === 1) {
                fetch(`https://getsec.eu/api/v1/assets/${asset.id}/`, {
                    method: 'PUT',
                    headers: headers,
                    body: body,
                }).then(console.log).catch(console.log);
            }
            if (asset.status === 2) {
                fetch('https://getsec.eu/api/v1/assets/', {
                    method: 'POST',
                    headers: headers,
                    body: body,
                }).then(console.log).catch(console.log);
            }
        });
    }

    private addAsset = () => {
        const data = this.state.data;
        data.push({asset: '', type: 1, status: 2} as AssetObject);
        this.mountedSetState(data);
    }

    private removeAsset = (key: number) => {
        const asset: AssetObject = this.state.data[key];
        if (asset && asset.id !== undefined && !asset.status) {
            const body = JSON.stringify(asset);
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', 'Basic YWRtaW46dmllbnN2aWVucw==');
            fetch(`https://getsec.eu/api/v1/assets/${asset.id}/`, {
                method: 'DELETE',
                headers: headers,
                body: body,
            }).then(console.log).catch(console.log);
        }
        this.mountedSetState({data: this.state.data.filter((_, i) => i !== key)});
    }

    private changeType = (key: number, item: ActionType) => {
        const data = this.state.data;
        data[key].type = item.type;
        if (!data[key].status) {
            data[key].status = 1;
        }
        this.mountedSetState(data);
    }
}
