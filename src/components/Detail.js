import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './home-component/Header';
import CountriesAlpha3Code from "./countries_two";
import { BsArrowLeft } from 'react-icons/bs';


class Detail extends Component {
    constructor() {
        super();
        this.state = {
            "country": [],
            "loading": false,
            "error": false,
            "languages": [],
            "currencies": [],
            "borders": [],
            "url": ""
        }
        this.handleDetailClick = this.handleDetailClick.bind(this)
    }

    componentDidMount() {
        const url = `${this.props.state.api}/alpha/${this.props.match.params.alpha3Code}`;
        this.handleDetailClick(url);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.key !== this.props.location.key) {
            const url = `${this.props.state.api}/alpha/${this.props.match.params.alpha3Code}`;
            this.handleDetailClick(url);
        }
    }

    handleDetailClick(url) {
        this.setState({ "loading": true })
        fetch(url)
            .then(blob => blob.json())
            .then(data => {
                console.dir(data)
                if (data.status === 404) {
                    this.setState({ "error": true })
                } else {
                    this.setState(prev => {
                        return {
                            ...prev,
                            "country": data,
                            "loading": false
                        }
                    });
                }
            });
    }


    render() {
        const { country } = this.state
        const detail = country.map((country, i) => <div className='FlexItem'>
            <div className="Flag">
                <img src={country.flags.svg} alt="" />
            </div>

            <div className="Details">
                <div className="CountryName">
                    <h2>{country.name.common}</h2>
                </div>
                <div className="FlexItem">
                    <div className="NativeDetails">
                        <p><b>Native Name:</b>{Object.keys(country.name.nativeName).map((natName, i) => <span> {country.name.nativeName[natName].common + (i < Object.keys(country.name.nativeName).length - 1 ? ", " : "")}</span>)}</p>
                        <p><b>Population: </b> {`${country.population}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
                        <p><b>Region: </b>{country.region}</p>
                        <p><b>Sub Region: </b>{country.subregion}</p>
                        <p><b>Capital: </b>{country.capital}</p>
                    </div>
                    <div className="EconomicDetails">
                        <p><b>Top Level Domain: </b>{country.tld.map((d, i) => `${d + (i < country.tld.length - 1 ? ', ' : '')}`)}</p>
                        <p><b>Currencies: </b>{Object.keys(country.currencies).map(curr => <span> {country.currencies[curr].name + (i < Object.keys(country.currencies).length - 1 ? ", " : "")}</span>)}</p>
                        <p><b>Languages: </b>{Object.keys(country.languages).map(lang => <span> {country.languages[lang] + (i < Object.keys(country.languages).length - 1 ? ", " : "")}</span>)}</p>
                    </div>
                </div>
                <div className="BorderCountries">
                    <h3>Border Countries:</h3>
                    <div className="Borders">{country.borders.map((b, i) =>

                        <Link
                            to={{
                                pathname: `/detail/${b}`,
                            }}
                            key={i}
                        >
                            <button>{b}</button>
                        </Link>
                    )}</div>
                </div>
            </div>


        </div>)
        console.dir(country)
        return (
            <div className={`App ${this.props.state.DarkMode ? "DarkMode" : 'Light'}`} >
                <Header
                    toggleMode={this.props.toggleMode}
                />
                <div className="Detail">
                    <div className="BackBtn">
                        <Link
                            to={{
                                pathname: "/",
                            }}
                        >
                            <button className="Btn"><BsArrowLeft /> Back</button>
                        </Link>
                    </div>
                    {detail}
                </div>
            </div >

        );
    }
}
export default Detail;
