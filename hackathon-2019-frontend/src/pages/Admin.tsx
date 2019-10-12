import React from 'react';
import {NavigationObject} from "../App";

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
            .then(result => this.mountedSetState({data: result}));
    }

    componentDidUpdate(_: Readonly<{}>, prevState: Readonly<AdminState>) {
      console.log('Admin.componentDidUpdate')
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    mountedSetState = (state: {}) => this._isMounted && this.setState(state);

    render(): React.ReactNode {
        return (
            <div className="Admin">
                {Object.entries(this.state.data).map((key: [string, any]) => (
                    <div className="DataRow">
                        <div>
                            {key[0]}
                        </div>
                        <div>
                            {JSON.stringify(key[1])}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
