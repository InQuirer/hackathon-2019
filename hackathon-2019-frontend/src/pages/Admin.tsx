import React from 'react';
import {NavigationObject} from '../App';

interface AdminProps {
    match: any;
}
interface AdminState {data: {asset: string}[]}

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
                    <div>assets (IP or DNS)</div>
                </div>
                {this.state.data.map((el, key) => (
                    <div key={key} className="DataRow">
                        <input
                            autoFocus={!key}
                            value={el.asset}
                            onChange={e => this.changeValue(key, e.target.value)}/>
                    </div>
                ))}
                <div className="DataRow">
                    <input type="submit" value="Update" onClick={this.updateAssets}/>
                </div>
            </div>
        );
    }

    private changeValue(key: number, value: string) {
        const data = this.state.data;
        data[key].asset = value;
        this.mountedSetState(data);
    }

    private updateAssets = () => {
        if (this.state.data.length) {
            const body = JSON.stringify(this.state.data.map(el => el.asset));
            fetch('http://getsec.eu:8000/api/v1/assets', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: body,
            }).catch(console.log);
        }
    }
}
