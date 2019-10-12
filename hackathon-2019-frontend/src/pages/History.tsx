import React from 'react';
import {NavigationObject} from "../App";

interface HistoryProps {
    match: any;
}
interface HistoryState {data: {}}

export default class History extends React.Component<HistoryProps, HistoryState> {
    static readonly nav: NavigationObject = {path: '/history', displayName: 'History', description: 'Look up to the history of alerts'};
    private _isMounted: boolean = false;

    constructor(props: HistoryProps) {
        super(props);
        this.state = {data: {}};
    }

    componentDidMount() {
        this._isMounted = true;
        const URL = 'https://swapi.co/api/people/?format=json';
        fetch(URL)
            .then(response => response.json())
            .then(result => this.mountedSetState({data: result.results}));
    }

    componentDidUpdate(_: Readonly<{}>, prevState: Readonly<HistoryState>) {
      console.log('History.componentDidUpdate')
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    mountedSetState = (state: {}) => this._isMounted && this.setState(state);

    render(): React.ReactNode {
        return (
            <div className="History">
                {Object.values(this.state.data).map((value: any) => (
                    <div className="DataRow">
                        <div>
                            {value.name}
                        </div>
                        <div>
                            <span>hair color: {value.hair_color};</span>
                            <span>eye color: {value.eye_color};</span>
                            <span>gender: {value.gender};</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
