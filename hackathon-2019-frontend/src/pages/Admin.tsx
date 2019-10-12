import React from 'react';
import {NavigationObject} from '../App';

interface AdminProps {
    match: any;
}
interface AdminState {data: {}}

export default class Admin extends React.Component<AdminProps, AdminState> {
    private _isMounted: boolean = false;
    static readonly nav: NavigationObject = {path: '/admin', displayName: 'Admin', description: 'Configure the mapping etc.'};

    constructor(props: AdminProps) {
        super(props);
        this.state = {data: {}};
    }

    componentDidMount() {
        this._isMounted = true;
        const URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
        fetch(URL)
            .then(response => response.json())
            .then(result => this.mountedSetState({data: result}))
            .catch(e => console.log(e));;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    mountedSetState = (state: {}) => this._isMounted && this.setState(state);

    render(): React.ReactNode {
        const keys = Object.keys(this.state.data);
        return (
            <div className="Admin">
                <div className="DataRow">
                    {keys.map((value, key) =>
                        <div>
                            {!key ? value : <span>{value}</span>}
                        </div>
                    )}
                </div>
                {Object.entries(this.state.data).map((el: [string, any], key) => (
                    <div key={key} className="DataRow">
                        <div>
                            {el[0]}
                        </div>
                        <div>
                            <span>{JSON.stringify(el[1])}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
