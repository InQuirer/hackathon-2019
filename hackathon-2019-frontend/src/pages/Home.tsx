import React from 'react';
import {NavigationObject} from "../App";

interface HomeProps {
    match: any;
}

export default class Home extends React.Component<HomeProps, {}> {
    static readonly nav: NavigationObject = {path: '/home', displayName: 'Home', description: 'Home Page'};
    private static pricing: {description: string, price: number}[] = [
        {description: 'Item 1', price: 5}
    ];

    constructor(props: HomeProps) {
        super(props);
    }

    render(): React.ReactNode {
        const keys = Object.keys(Home.pricing[0]);
        return (
            <div className="Home">
                    <div className="About">
                        <h1>About us</h1>
                        <p>
                            Some brief information and pricing
                        </p>
                    </div>
                    <div className="Pricing">
                        <table style={{margin: 'auto'}}>
                            <thead>
                                <tr>
                                    {keys.map(el => <th>{el}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {Home.pricing.map(el =>
                                <tr>
                                    <td>{el.description}</td>
                                    <td>€ {el.price}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
            </div>
        );
    }
}
