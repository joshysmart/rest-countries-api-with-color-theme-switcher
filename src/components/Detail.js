import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './home-component/Header';
import CountriesAlpha3Code from "./countries_two.json";

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            "DarkMode": false
        }

        this.toggleMode = this.toggleMode.bind(this);

    }

    toggleMode() {
        this.setState(prev => {
            return {
                "DarkMode": !prev.DarkMode
            }
        })
    }


    render() {

        const {name, flag, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders} = this.props.location.state;
        const countryLanguages = languages.map((lang, i) => `${lang.name + (i < languages.length - 1 ? ', ' : '')}`)
        const countryCurrencies = currencies.map((cur, i) => `${cur.name + (i < currencies.length - 1 ? ', ' : '')}`);
        const countryBorders = borders.map(border => 
            // console.log(CountriesAlpha3Code[0][border]))

        <button>{CountriesAlpha3Code[0][border]}</button>)
        console.log(countryBorders)

        return (
            <div className={`App ${this.state.DarkMode ? "DarkMode" : 'Light'}`}>
                <Header
                toggleMode={this.toggleMode}
                state={this.state}              
                />

                <div className="Detail">
                    <div>
                        <button className="BackBtn">Back</button>
                    </div>
                    <div>
                        <div className="Flag">
                            <img src={flag} alt="" />
                        </div>
                        <div className="Details">
                            <div className="">
                                <h2>{name}</h2>
                            </div>
                            <div className="">
                                <p><b>Native Name:</b> {nativeName}</p>
                                <p><b>Population: </b> {`${population}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
                                <p><b>Region: </b>{region}</p>
                                <p><b>Sub Region: </b>{subregion}</p>
                                <p><b>Capital: </b>{capital}</p>
                            </div>
                            <div className="">
                                <p><b>Top Level Domain: </b>{topLevelDomain}</p>
                                <p><b>Currencies: </b>{countryCurrencies}</p>
                                <p><b>Languages: </b>{countryLanguages}</p>
                            </div>
                            <div>
                                <h3>Border Countries:</h3>
                                <div>{countryBorders}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Detail;