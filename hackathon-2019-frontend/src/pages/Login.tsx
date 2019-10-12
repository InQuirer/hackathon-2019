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
                <form onSubmit={e => e.preventDefault()}>
                <input type="email"
                       required={true}
                       value={this.state.email}
                       onChange={(e) => this.setState({email: e.target.value})}
                       onKeyDown={(e) => e.keyCode === 13 && this.authorize()}
                       placeholder="Email"
                       autoFocus={true}/>
                <input type="text"
                       required={true}
                       value={this.state.password}
                       onChange={(e) => this.setState({password: e.target.value})}
                       onKeyDown={(e) => e.keyCode === 13 && this.authorize()}
                       placeholder="Password"/>
                <input type="submit" onClick={this.authorize}/>
                </form>
            </div>
        );
    }

    private authorize = () => this.props.authenticate({
        email: this.state.email,
        password: this.state.password
    })
}
