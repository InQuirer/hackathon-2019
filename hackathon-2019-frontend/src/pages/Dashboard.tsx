import React from 'react';
import {NavigationObject} from '../App';

interface DashboardProps {
    match: any;
}
interface DashboardState {data: ProcessObject[]}

interface ProcessObject {
    id: number;
    name: string;
}

export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
    static readonly nav: NavigationObject = {path: '/dashboard', displayName: 'Dashboard', description: 'Look up to the Dashboard of alerts'};
    private static  colors = ['red', 'green', 'yellow'];
    private _isMounted: boolean = false;

    constructor(props: DashboardProps) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        this._isMounted = true;
        const URL = 'https://getsec.eu/api/v1/processes/?format=json';
        fetch(URL)
            .then(response => response.json())
            .then((result: ProcessObject[]) => {
                const el = document.getElementById('dashboard-content');
                let i = 0;
                if (el) {
                    result.forEach(item => {
                        el.innerHTML += `<p class="lead data-source ${Dashboard.colors[i++ % 3]}">${item.name}</p>`;
                    })
                }
            })
            .catch(e => console.log(e));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    mountedSetState = (state: {}) => this._isMounted && this.setState(state);

    render(): React.ReactNode {
        console.log(this.state.data);
        let i = 0;
        return (
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="tabs-container tabs--vertical">
                                <ul className="tabs">
                                    <li className="active">
                                        <div className="tab__title"><i
                                            className="icon icon--sm block icon-Target-Market"/> <span
                                            className="h5">Risks </span></div>
                                        <div className="tab__content" id="dashboard-content"/>
                                    </li>
                                    <li>
                                        <div className="tab__title"><i
                                            className="icon icon--sm block icon-Text-Effect"/> <span
                                            className="h5">Setup</span></div>
                                        <div className="tab__content">
                                            <p className="lead">Domain<br/>IP<br/>E-Mail<br/>Sync interval<br/>TECH VULN to
                                                BUSINESS risk mapping<br/><br/></p>
                                            <p className="lead">Hngg<br/></p>
                                            <p className="lead">CRM<br/></p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="tab__title"><i
                                            className="icon icon--sm block icon-Love-User"/> <span className="h5">Tech Data</span>
                                        </div>
                                        <div className="tab__content">
                                            <p className="lead">Access/Integration Logs<br/></p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
