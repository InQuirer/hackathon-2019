import React from 'react';
import {NavigationObject, UserCredentials} from '../App';

interface LoginProps {
    match: any;
    authenticate: (userCredentials: UserCredentials) => void;
}

export default class Login extends React.Component<LoginProps, UserCredentials> {
    static readonly nav: NavigationObject = {path: '/login', displayName: 'Login', description: 'Login Page'};

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render(): React.ReactNode {
        return (
            <div className="Login">
                <input type="text"
                       value={this.state.email}
                       onChange={(e) => this.setState({email: e.target.value})}
                       onKeyDown={(e) => e.keyCode === 13 && this.authorize()}
                       placeholder="Login or Email"
                       autoFocus={true}/>
                <input type="text"
                       value={this.state.password}
                       onChange={(e) => this.setState({password: e.target.value})}
                       onKeyDown={(e) => e.keyCode === 13 && this.authorize()}
                       placeholder="Password"/>
                <input type="submit" onClick={this.authorize}/>
            </div>
        );
    }

    private authorize = () => this.props.authenticate({
        email: this.state.email,
        password: this.state.password
    })
}
