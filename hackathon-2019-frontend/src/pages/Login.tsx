import React from 'react';
import {NavigationObject, UserCredentials} from '../App';

interface LoginProps {
    match: any;
    authenticate: (userCredentials: UserCredentials) => void;
}

export default class Login extends React.Component<LoginProps, UserCredentials> {
    static readonly nav: NavigationObject = {path: '/login', displayName: 'Login', description: 'Login Page'};
    private static inner6 = require('../static/img/inner-6.jpg');

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render(): React.ReactNode {
        return (
            <section className="height-100 imagebg text-center" data-overlay="6">
                <div className="background-image-holder"><img alt="background" src={Login.inner6}/></div>
                <div className="container pos-vertical-center">
                    <div className="row">
                        <div className="col-md-7 col-lg-5">
                            <h2>Login to continue</h2>
                            <p className="lead"> Welcome back, sign in with your existing SIS account credentials </p>
                            <form onSubmit={e => e.preventDefault()}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="email"
                                              required={true}
                                              value={this.state.email}
                                              onChange={(e) => this.setState({email: e.target.value})}
                                              onKeyDown={(e) => e.keyCode === 13 && this.authorize()}
                                              placeholder="Email"
                                              autoFocus={true}/>
                                    </div>
                                    <div className="col-md-12">
                                        <input type="password"
                                               required={true}
                                               value={this.state.password}
                                               onChange={(e) => this.setState({password: e.target.value})}
                                               onKeyDown={(e) => e.keyCode === 13 && this.authorize()}
                                               placeholder="Password"/>
                                    </div>
                                    <div className="col-md-12">
                                        <button className="btn btn--primary type--uppercase"
                                                type="submit"
                                                onClick={this.authorize}>
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <span className="type--fine-print block">Dont have an account yet? <a
                                href=".">Create account</a></span> <span
                            className="type--fine-print block">Forgot your username or password? <a
                            href=".">Recover account</a></span>
                        </div>
                    </div>
                </div>
            </section>
        );
        // return (
        //     <div className="Login">
        //         <form onSubmit={e => e.preventDefault()}>
        //         <input type="email"
        //                required={true}
        //                value={this.state.email}
        //                onChange={(e) => this.setState({email: e.target.value})}
        //                onKeyDown={(e) => e.keyCode === 13 && this.authorize()}
        //                placeholder="Email"
        //                autoFocus={true}/>
        //         <input type="text"
        //                required={true}
        //                value={this.state.password}
        //                onChange={(e) => this.setState({password: e.target.value})}
        //                onKeyDown={(e) => e.keyCode === 13 && this.authorize()}
        //                placeholder="Password"/>
        //         <input type="submit" onClick={this.authorize}/>
        //         </form>
        //     </div>
        // );
    }

    private authorize = () => this.props.authenticate({
        email: this.state.email,
        password: this.state.password
    })
}
