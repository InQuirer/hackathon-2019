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

export const EmptyLink = (className?: string, innerHTML?: any) =>
    <NavLink className={className || ""} to="">{innerHTML || ""}</NavLink>;

const LoginLink =
    <NavLink
        className="App-link"
        to={Login.nav.path}
        title={Login.nav.description}
        isActive={() => Login.nav.path.endsWith(window.location.pathname.split('/')[1])}
    >
        {Login.nav.displayName}
    </NavLink>;

const LogoutLink =
    <NavLink
        className="App-link right"
        to={Logout.nav.path}
        title={Logout.nav.description}
        isActive={() => Logout.nav.path.endsWith(window.location.pathname.split('/')[1])}
    >
        {Logout.nav.displayName}
    </NavLink>;

const HomeLink =
    <NavLink
        className="App-link"
        to={Home.nav.path}
        title={Home.nav.description}
        isActive={() => Home.nav.path.endsWith(window.location.pathname.split('/')[1])}
    >
        {Home.nav.displayName}
    </NavLink>;

const getNavigationTabs = (user: User) => {
    return (
        <React.Fragment>
            <li>{HomeLink}</li>
            {user.sessionID ?
                <React.Fragment>
                    {navigationMap.map((el, key) =>
                    <li key={key}><NavLink
                        className="App-link"
                        to={el.path}
                        title={el.description}
                        isActive={() => el.path.endsWith(window.location.pathname.split('/')[1])}
                    >
                        {el.displayName}
                    </NavLink></li>)}
                    <li>{LogoutLink}</li>
                </React.Fragment>
                :
                <li>{LoginLink}</li>
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
                <div className="nav-container">

                    <div className="via-1570873225800">
                        <div className="bar bar--sm visible-xs">
                            <div className="container">
                                <div className="row">
                                    <div className="col-9 col-md-10 text-right">
                                        {EmptyLink("hamburger-toggle",
                                            <i className="icon icon--sm stack-interface stack-menu"/>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <nav id="menu1" className="bar bar-1 hidden-xs">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-11 col-md-12 text-right text-left-xs text-left-sm">
                                        <div className="bar__module">
                                            <ul className="menu-horizontal text-left">
                                                {getNavigationTabs(this.user)}
                                                <li className="dropdown">
                                                    <div className="dropdown__container">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="dropdown__content col-lg-2">
                                                                    <ul className="menu-vertical">
                                                                        <li>{EmptyLink()}</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="dropdown">
                                                    <div className="dropdown__container">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="dropdown__content row w-100">
                                                                    <div className="col-lg-3">
                                                                        <h5>Menu Title</h5>
                                                                        <ul className="menu-vertical">
                                                                            <li>{EmptyLink()}</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        <h5>Menu Title</h5>
                                                                        <ul className="menu-vertical">
                                                                            <li>{EmptyLink()}</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        <h5>Menu Title</h5>
                                                                        <ul className="menu-vertical">
                                                                            <li>{EmptyLink()}</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        <h5>Menu Title</h5>
                                                                        <ul className="menu-vertical">
                                                                            <li>{EmptyLink()}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bar__module">
                                            {EmptyLink("btn btn--sm btn--primary type--uppercase",
                                                <span className="btn__text">Buy Now</span>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="main-container">
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
