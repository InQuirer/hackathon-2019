import React from 'react';
import './App.scss';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import Dashboard from './pages/Dashboard';
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

export function getUser(): User {
    const storedUser = localStorage.getItem('user');
    const newUser = (): User => ({name: '', email: '', sessionID: ''});
    function validUser(user: User): User {
        if (user.name && user.email && user.sessionID) {
            return user;
        }
        localStorage.clear();
        return newUser();
    }
    return storedUser ? validUser(JSON.parse(storedUser)) : newUser();
}

const navigationMap: NavigationObject[] = [
    Dashboard.nav,
    Admin.nav
];

interface AppState {validationPassed: boolean | undefined}

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
    private static background = require('./static/img/Website-Design-Background.png');
    private user: User = getUser();

    constructor(props: {}) {
        super(props);
        this.state = {
            validationPassed: undefined
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="App-header">
                        <div className="App-navigation">
                            {getNavigationTabs(this.user)}
                            {this.state.validationPassed === false &&
                                <div className="warning">
                                    Please check your input
                                </div>}
                        </div>
                    </div>
                    <div className="App-content" style={{backgroundImage: `url(${App.background})`}}>
                        <Route exact path={Home.nav.path} component={Home}/>
                        <Route exact path={Logout.nav.path} render={(props) =>
                            <Logout {...props} logout={this.logout}/>}/>
                        {this.user.sessionID ?
                            <React.Fragment>
                                <Route exact path={Login.nav.path} render={() => <Redirect to={Home.nav.path}/>}/>
                                <Route exact path={Dashboard.nav.path} component={Dashboard}/>
                                {/*<Route exact path={`${Dashboard.nav.path}/:ID`} component={Dashboard} />*/}
                                <Route exact path={Admin.nav.path} component={Admin}/>
                                {/*<Route exact path={`${Admin.nav.path}/:ID`} component={Admin} />*/}
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Route exact path={Login.nav.path} render={(props) =>
                                    <Login {...props} authenticate={this.authenticate}/>}/>
                            </React.Fragment>

                        }
                        <Route exact path="/" render={() => <Redirect to={Home.nav.path}/>}/>
                    </div>
                </div>
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
            this.user.name = userCredentials.email.split('@')[0];
            this.user.email = userCredentials.email;
            this.user.sessionID = getHashes()[1];
            localStorage.setItem('user', JSON.stringify(this.user));
        }
        this.setState({validationPassed: validationPassed});
    };

    private logout = () => {
        localStorage.clear();
        this.user = getUser();
        this.setState({validationPassed: undefined});
    };
}
