import React from 'react';
import './App.scss';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import History from './pages/History';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import {getHashes} from 'crypto';
import Logout from "./pages/Logout";

export interface NavigationObject {
    path: string;
    displayName: string;
    description: string;
}

export interface User {
    name: string;
    email: string;
    sessionID: string;
}

export interface UserCredentials {
    email: string,
    password: string
}

const navigationMap: NavigationObject[] = [
    History.nav,
    Admin.nav
];

interface AppState {user: User, validationPassed: boolean | undefined}

const currentUser: User = {
    name: '',
    email: '',
    sessionID: ''
};

const getNavigationTabs = (user: User) => {
    return (
        <React.Fragment>
            <NavLink
                className="App-link"
                to={Home.nav.path}
                title={Home.nav.description}
                isActive={() => Home.nav.path.endsWith(window.location.pathname.split('/')[1])}
            >
                {Home.nav.displayName}
            </NavLink>
            {user.sessionID ?
                <React.Fragment>
                    {navigationMap.map((el, key) =>
                    <NavLink
                        key={key}
                        className="App-link"
                        to={el.path}
                        title={el.description}
                        isActive={() => el.path.endsWith(window.location.pathname.split('/')[1])}
                    >
                        {el.displayName}
                    </NavLink>)}
                    <NavLink
                        className="App-link right"
                        to={Logout.nav.path}
                        title={Logout.nav.description}
                        isActive={() => Logout.nav.path.endsWith(window.location.pathname.split('/')[1])}
                    >
                        {Logout.nav.displayName}
                    </NavLink>
                </React.Fragment>
                :
                <React.Fragment>
                    <NavLink
                        className="App-link"
                        to={Login.nav.path}
                        title={Login.nav.description}
                        isActive={() => Login.nav.path.endsWith(window.location.pathname.split('/')[1])}
                    >
                        {Login.nav.displayName}
                    </NavLink>
                </React.Fragment>
            }
        </React.Fragment>
)};

export default class App extends React.Component<{}, AppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            user: currentUser,
            validationPassed: undefined
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>, snapshot?: any): void {

    }

    render() {
        console.log(this.state.validationPassed);
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="App-header">
                        <div className="App-navigation">
                            {getNavigationTabs(this.state.user)}
                            {this.state.validationPassed === false &&
                                <div className="warning">
                                    Please check your input
                                </div>}
                        </div>
                    </div>
                    <div className="App-content">
                        <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                        <Route exact path="/home" component={Home}/>
                        {this.state.user.sessionID ?
                            <React.Fragment>
                                < Route exact path={History.nav.path} component={History} />
                                {/*<Route exact path={`${History.nav.path}/:ID`} component={History} />*/}
                                <Route exact path={Admin.nav.path} component={Admin} />
                                {/*<Route exact path={`${Admin.nav.path}/:ID`} component={Admin} />*/}
                                <Route exact path="/logout" render={(props) =>
                                    <Logout {...props} logout={this.logout} />}/>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Route exact path="/login" render={(props) =>
                                    <Login {...props} authenticate={this.authenticate} />}/>
                            </React.Fragment>

                        }
                    </div>
                </div>
            }
            </BrowserRouter>
        );
    }

    private authenticate = (userCredentials: UserCredentials) => {
        let validationPassed: boolean | undefined = userCredentials.password.length > 0
                && userCredentials.email.includes('@');
        if (!userCredentials.email && !userCredentials.password) {
            validationPassed = undefined;
        }
        if (validationPassed) {
            this.state.user.email = userCredentials.email;
            this.state.user.name = userCredentials.email.split('@')[0];
            this.state.user.sessionID = getHashes()[1];
        }
        this.setState({validationPassed: validationPassed, user: this.state.user});
    };

    private logout = () => {
        this.setState({validationPassed: undefined, user: {
            name: '',
            email: '',
            sessionID: ''
        }});
    };
}
