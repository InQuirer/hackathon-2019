import React from 'react';
import {NavigationObject} from '../App';

interface HomeProps {
    match: any;
}

export default class Home extends React.Component<HomeProps, {}> {
    static readonly nav: NavigationObject = {path: '/home', displayName: 'Home', description: 'Home Page'};

    render(): React.ReactNode {
        return (
            <div className="Home">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-lg-7">
                            <h1>Cyber Security risks made simple</h1>
                            <p className="lead">We translate technical security risks to clearly understandable business
                                risks.</p>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="button">
                                    <div className="feature__body">
                                        <p>We collect cyber security data about&nbsp; your systems from multiple sources
                                            all over the internet.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="button">
                                    <div className="feature__body">
                                        <p>Collected data gets analyzed and correlated</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="button">
                                    <div className="feature__body">
                                        <p> Take comfort in 6 months included support with a dedicated support forum</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-9 col-lg-7">
                            <h1>Cyber Security risks made simple</h1>
                            <p className="lead">We translate technical security risks to clearly understandable
                                business risks.</p>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="button">
                                    <div className="feature__body">
                                        <p>We collect cyber security data about&nbsp; your systems from multiple
                                            sources all over the internet.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="button">
                                    <div className="feature__body">
                                        <p>Collected data gets analyzed and correlated</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="button">
                                    <div className="feature__body">
                                        <p>Take comfort in 6 months included support with a dedicated support
                                            forum</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="pricing">
                                <h3>Basic</h3>
                                <span className="h2"><strong>€4.99</strong></span> <span className="price-type">Per Month, EUR Incl VAT.</span>
                                <ul>
                                    <li><span
                                        className="checkmark"></span><span>24/7 Phone Support</span>
                                    </li>
                                    <li><span
                                        className="checkmark"></span><span>Unlimited Skips</span></li>
                                    <li><span
                                        className="checkmark"></span><span>Import CSV Data</span></li>
                                    <li><span
                                        className="checkmark"></span><span>Automatic Transfer</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="pricing">
                                <h3>PRO</h3>
                                <span className="h2"><strong>€99.99</strong></span> <span className="price-type">Per Month, EUR Incl VAT.</span>
                                <ul>
                                    <li><span
                                        className="checkmark"></span><span>24/7 Phone Support</span>
                                    </li>
                                    <li><span
                                        className="checkmark"></span><span>Unlimited Skips</span></li>
                                    <li><span
                                        className="checkmark"></span><span>Import CSV Data</span></li>
                                    <li><span
                                        className="checkmark"></span><span>Automatic Transfer</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="pricing">
                                <h3>Enterprise</h3>
                                <span className="h2"><strong>€499 </strong></span> <span className="price-type">Per Month, EUR Incl VAT.</span>
                                <ul>
                                    <li><span
                                        className="checkmark"></span><span>24/7 Phone Support</span>
                                    </li>
                                    <li><span
                                        className="checkmark"></span><span>Unlimited Skips</span></li>
                                    <li><span
                                        className="checkmark"></span><span>Import CSV Data</span></li>
                                    <li><span
                                        className="checkmark"></span><span>Automatic Transfer</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
