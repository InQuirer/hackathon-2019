import React from 'react';
import './App.scss';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import History from "./pages/History";
import Admin from "./pages/Admin";

export interface NavigationObject {
    path: string;
    displayName: string;
    description: string;
}

const navigationMap: NavigationObject[] = [
    History.nav,
    Admin.nav
];

const getNavigationTabs = () => navigationMap.map((el) => (
        <NavLink
            className="App-link"
            to={el.path}
            title={el.description}
            isActive={() => el.path.endsWith(window.location.pathname.split('/')[1])}
        >
            {el.displayName}
        </NavLink>
));

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="App-header">
                    <div className="App-navigation">
                        {getNavigationTabs()}
                    </div>
                </div>
                <div className="App-content">
                    <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                    <Route exact path={History.nav.path} component={History} />
                    {/*<Route exact path={`${History.nav.path}/:ID`} component={History} />*/}
                    <Route exact path={Admin.nav.path} component={Admin} />
                    {/*<Route exact path={`${Admin.nav.path}/:ID`} component={Admin} />*/}
                </div>
            </div>
        </BrowserRouter>
    );
};
export default App;
