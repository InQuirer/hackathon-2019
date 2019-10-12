import React from 'react';
import {NavigationObject} from '../App';

interface HistoryProps {
    match: any;
}
interface HistoryState {data: {}[]}

export default class History extends React.Component<HistoryProps, HistoryState> {
    static readonly nav: NavigationObject = {path: '/history', displayName: 'History', description: 'Look up to the history of alerts'};
    private _isMounted: boolean = false;

    constructor(props: HistoryProps) {
        super(props);
        this.state = {data: [
                {"id":1,"type":0,"asset":"1.1.1.1"},
                {"id":2,"type":1,"asset":"http://wordpress.com"},
                {"id":3,"type":0,"asset":"1.1.1.1"},
                {"id":4,"type":1,"asset":"http://wordpress.com"},
                {"id":5,"type":0,"asset":"1.1.1.1"},
                {"id":6,"type":1,"asset":"http://wordpress.com"}
            ]};
    }

    componentDidMount() {
        this._isMounted = true;
        const URL = 'http://getsec.eu:8000/api/v1/assets/?format=json';
        false && fetch(URL)
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
            <div className="History">
                <div className="DataRow">
                    {keys.map((value, key) =>
                        <div>
                            {!key ? value : <span>{value}</span>}
                        </div>
                    )}
                </div>
                {this.state.data.map((value: any) => (
                    <div className="DataRow">
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
