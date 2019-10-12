import React from 'react';
import {NavigationObject} from "../App";

interface LoginProps {
    match: any;
}

export default class Login extends React.Component<LoginProps, {}> {
    static readonly nav: NavigationObject = {path: '/login', displayName: 'Login', description: 'Login Page'};

    constructor(props: LoginProps) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className="Login">
                <input type="text" placeholder="Login or Email"/>
                <input type="text" placeholder="Password"/>
                <input type="submit"/>
            </div>
        );
    }
}
