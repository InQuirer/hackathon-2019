import React from 'react';
import {NavigationObject} from '../App';

interface DashboardProps {
    match: any;
}
interface DashboardState {data: {}[]}

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
    static readonly nav: NavigationObject = {path: '/dashboard', displayName: 'Dashboard', description: 'Look up to the Dashboard of alerts'};
    private _isMounted: boolean = false;

    constructor(props: DashboardProps) {
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
        const keys = Object.keys(this.state.data[0]);
        return (
            <div className="Dashboard">
                <div className="DataRow">
                    {keys.map((value, key) =>
                        <div key={key}>
                            {!key ? value : <span>{value}</span>}
                        </div>
                    )}
                </div>
                {this.state.data.map((value: any, key) => (
                    <div className="DataRow" key={key}>
                        <div>
                            {value.id}
                        </div>
                        <div>
                            <span>{value.type}</span>
                        </div><div>
                            <span>{value.asset}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}