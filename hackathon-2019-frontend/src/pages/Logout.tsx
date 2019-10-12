import React from 'react';
import {NavigationObject, UserCredentials} from '../App';
import {Redirect} from "react-router";
import Login from "./Login";

interface LogoutProps {
    match: any;
    logout: () => void;
}

export default class Logout extends React.Component<LogoutProps, UserCredentials> {
    static readonly nav: NavigationObject = {path: '/logout', displayName: 'Logout', description: 'Logout Page'};

    componentWillUnmount(): void {
        this.props.logout();
    }

    render() {
        return <Redirect to={Login.nav.path}/>;
    }
}
