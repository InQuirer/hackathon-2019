import React from 'react';
import './App.scss';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import History from "./pages/History";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";

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

const navigationMap: NavigationObject[] = [
    History.nav,
    Admin.nav
];

interface AppState {user: User}

const Context: React.Context<User> = React.createContext({
    name: '',
    email: '',
    sessionID: ''
});

const currentUser: User = {
    name: '',
    email: '',
    sessionID: ''
};

const getNavigationTabs = (user: User) => {
    console.log(user);
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
            {user.sessionID ? navigationMap.map((el) =>
                    <NavLink
                        className="App-link"
                        to={el.path}
                        title={el.description}
                        isActive={() => el.path.endsWith(window.location.pathname.split('/')[1])}
                    >
                        {el.displayName}
                    </NavLink>)
                :
                <React.Fragment>
                    <NavLink
                        className="App-link"
                        to="/login"
                        title="Log in"
                        isActive={() => '/login'.endsWith(window.location.pathname.split('/')[1])}
                    >
                        {'Log in'}
                    </NavLink>
                </React.Fragment>
            }
        </React.Fragment>
)};

export default class App extends React.Component<{}, AppState> {

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<AppState>, snapshot?: any): void {

    }

    render(): React.ReactNode {
        return (
            <BrowserRouter>
                <Context.Provider value={currentUser}>
                    <Context.Consumer>
                        {user =>
                            <div className="App">
                                <div className="App-header">
                                    <div className="App-navigation">
                                        {getNavigationTabs(user)}
                                    </div>
                                </div>
                                <div className="App-content">
                                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                                    <Route exact path="/home" component={Home}/>
                                    {user.sessionID ?
                                        <React.Fragment>
                                            < Route exact path={History.nav.path} component={History} />
                                            {/*<Route exact path={`${History.nav.path}/:ID`} component={History} />*/}
                                            <Route exact path={Admin.nav.path} component={Admin} />
                                            {/*<Route exact path={`${Admin.nav.path}/:ID`} component={Admin} />*/}
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <Route exact path="/login" component={Login}/>
                                        </React.Fragment>

                                    }
                                </div>
                            </div>
                        }
                    </Context.Consumer>
                </Context.Provider>
            </BrowserRouter>
        );
    }
}
