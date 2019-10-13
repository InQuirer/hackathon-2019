import React from 'react';
import {NavigationObject} from '../App';

interface HomeProps {
    match: any;
}

export default class Home extends React.Component<HomeProps, {}> {
    static readonly nav: NavigationObject = {path: '/home', displayName: 'Home', description: 'Home Page'};
    private landing23 = require('../static/img/landing-23.jpg');

    render(): React.ReactNode {
        return (
                <React.Fragment>
                    <section className="cover cover-features imagebg space--lg" data-overlay="2">
                        <div className="background-image-holder"><img alt="background" src={this.landing23}/></div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-7">
                                    <h1>Cyber Security Risks made SIMPLE<br/></h1>
                                    <p className="lead">We take deep technical level cyber security risks and translate
                                        them in a clean understandable way into the business risks. So YOU can make
                                        decisions on actually what matters for YOUR business.<br/></p>
                                    <a className="btn btn--primary type--uppercase" href="."> <span
                                        className="btn__text">
						View The Demos
					</span> </a>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="feature feature-3 boxed boxed--lg boxed--border"><i
                                        className="icon icon--lg icon-Mail-3"></i>
                                        <h4>Save YOUR time and MONEY<br/><br/></h4>
                                        <p>Save YOUR time and MONEY<br/></p> <a href=".">
                                            Learn More
                                        </a></div>
                                </div>
                                <div className="col-md-4">
                                    <div className="feature feature-3 boxed boxed--lg boxed--border"><i
                                        className="icon icon--lg icon-Air-Balloon"></i>
                                        <h4>Deal with your BUSINESS not disaster recovery</h4>
                                        <p>Deal with your BUSINESS not disaster recovery</p> <a href=".">
                                            Learn More
                                        </a> <span className="label">New</span></div>
                                </div>
                                <div className="col-md-4">
                                    <div className="feature feature-3 boxed boxed--lg boxed--border"><i
                                        className="icon icon--lg icon-Bacteria"></i>
                                        <h4>Worry less and SLEEP better</h4>
                                        <p>Worry less and SLEEP better</p> <a href=".">
                                            Learn More
                                        </a></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="pricing-section-2 text-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-lg-3">
                                    <div className="pricing pricing-3">
                                        <div className="pricing__head bg--secondary boxed">
                                            <h5>Free</h5> <span className="h1"><span
                                            className="pricing__dollar">€</span>0</span>
                                            <p className="type--fine-print">Per Month, EUR.</p>
                                        </div>
                                        <ul>
                                            <li><span>Anywhere Access</span></li>
                                            <li><span>Predefined alerts </span></li>
                                            <li><span>1 asset</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="pricing pricing-3">
                                        <div className="pricing__head bg--secondary boxed">
                                            <h5>Light</h5> <span className="h1"><span
                                            className="pricing__dollar">€49</span></span>
                                            <p className="type--fine-print">Per Month, EUR.</p>
                                        </div>
                                        <ul>
                                            <li><span>Anywhere Access</span></li>
                                            <li><span>15 assets</span></li>
                                            <li><span>Predefined alerts </span></li>
                                            <li><span>24/7 E-mail Support</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="pricing pricing-3">
                                        <div className="pricing__head bg--primary boxed"><span
                                            className="label">Value</span>
                                            <h5>PRO</h5> <span className="h1"><span
                                                className="pricing__dollar">€99</span></span>
                                            <p className="type--fine-print">Per Month, EUR.</p>
                                        </div>
                                        <ul>
                                            <li><span>Anywhere Access</span></li>
                                            <li><span>100 assets</span></li>
                                            <li><span>Custom alerts</span></li>
                                            <li><span>Workflows based on actions </span></li>
                                            <li><span>24/7 e-mail and phone support</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="pricing pricing-3">
                                        <div className="pricing__head bg--secondary boxed">
                                            <h5>Enterprise</h5> <span className="h1">Contact US<br/></span>
                                            <p className="type--fine-print">We will work together to find best possible
                                                solution for you<br/></p>
                                        </div>
                                        <ul>
                                            <li><span>Anywhere Access</span></li>
                                            <li><span>Unlimited assets</span></li>
                                            <li><span>Local and Cloud custom integrations </span></li>
                                            <li><span>Custom alerts </span></li>
                                            <li><span>24/7 e-mail and phone support</span></li>
                                            <li><span>Workflows based on actions</span></li>
                                            <li><span>No Downtime</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="feature feature-5 boxed boxed--lg boxed--border"><i
                                        className="icon icon-Pantone icon--lg"></i>
                                        <div className="feature__body">
                                            <h5>Information<br/></h5>
                                            <p>We collect only relevant cyber security data about your systems from
                                                local and internet sources.<br/>Technical risks translated into business
                                                    risks. You don't have to worry about "web servers" or
                                                    "vulnerabilities".</p> <a href=".">Learn More</a></div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="feature feature--featured feature-5 boxed boxed--lg boxed--border">
                                        <i className="icon icon-Fingerprint icon--lg"></i>
                                        <div className="feature__body">
                                            <h5>Processing</h5>
                                            <p>All collected data gets securely processed and matched with your systems
                                                to provide technical risk profile. No need to have investment for extra
                                                infrastructure. Our solution is up and running with minimal effort.</p>
                                            <a href=".">Learn More</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="text-center space--sm footer-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="heading-block">
                                        <ul className="list-inline list--hover">
                                            <li><a href="."><span>Our Company</span></a></li>
                                            <li><a href="."><span>Locations</span></a></li>
                                            <li><a href="."><span>Products</span></a></li>
                                            <li><a href="."><span>Work With Us</span></a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="social-list list-inline list--hover">
                                            <li><a href="."><i className="socicon socicon-google icon icon--xs"></i></a>
                                            </li>
                                            <li><a href="."><i
                                                className="socicon socicon-twitter icon icon--xs"></i></a></li>
                                            <li><a href="."><i
                                                className="socicon socicon-facebook icon icon--xs"></i></a></li>
                                            <li><a href="."><i className="socicon socicon-instagram icon icon--xs"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div><span className="type--fine-print">Made in Tartu, Estonia</span></div>
                                    <div><span className="type--fine-print">© <span className="update-year">2019</span> Our Company</span>
                                        <a className="type--fine-print" href=".">Privacy Policy</a> <a
                                            className="type--fine-print" href=".">Legal</a></div>
                                </div>
                            </div>
                        </div>
                    </footer>
            </React.Fragment>
        );
    }
}
