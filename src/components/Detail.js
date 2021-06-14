import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './home-component/Header';
import CountriesAlpha3Code from "./countries_two";
import { BsArrowLeft } from 'react-icons/bs';


class Detail extends Component {
    constructor() {
        super();
        this.state = {
            "country": {},
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
        const url = `https://restcountries.eu/rest/v2/alpha/${this.props.match.params.alpha3Code}`;
        this.handleDetailClick(url);
    }    

    componentDidUpdate(prevProps) {
        console.log(prevProps)
        if(prevProps.location.key !== this.props.location.key) {

            const url =         `https://restcountries.eu/rest/v2/alpha/${this.props.match.params.alpha3Code}`;
            this.handleDetailClick(url);
        }    
    }

     handleDetailClick(url) {
        this.setState({ "loading": true })
        fetch(url)
          .then(blob => blob.json())
          .then(data => {
            if (data.status === 404) {
              this.setState({ "error": true })
            } else {
              this.setState(prev => {
                return {
                  ...prev,
                  "country": data,
                  "languages": [...data.languages],
                  "currencies": [...data.currencies],
                  "borders": [...data.borders],
                  "loading": false
                }
              });
            }
          });
      }


    render() {
        const {country, languages, currencies, borders} = this.state
        const countryLanguages = languages.map((lang, i) => `${lang.name + (i < languages.length - 1 ? ', ' : '')}`);
        const countryCurrencies = currencies.map((cur, i) => `${cur.name + (i < currencies.length - 1 ? ', ' : '')}`);
        const countryBorders = borders.map((border, i) => 
        <Link
            to={{
                pathname: `/detail/${border}`,
            }}
            key={i}
        >
            <button key={i}>{CountriesAlpha3Code[0][border]}</button>
        </Link>)

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
                <div className="FlexItem">
                    <div className="Flag">
                        <img src={country.flag} alt="" />
                    </div>
                    <div className="Details">
                        <div className="CountryName">
                            <h2>{country.name}</h2>
                        </div>
                        <div className="FlexItem"> 
                            <div className="NativeDetails">
                                <p><b>Native Name:</b> {country.nativeName}</p>
                                <p><b>Population: </b> {`${country.population}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}</p>
                                <p><b>Region: </b>{country.region}</p>
                                <p><b>Sub Region: </b>{country.subregion}</p>
                                <p><b>Capital: </b>{country.capital}</p>
                            </div>
                            <div className="EconomicDetails">
                                <p><b>Top Level Domain: </b>{country.topLevelDomain}</p>
                                <p><b>Currencies: </b>{countryCurrencies}</p>
                                <p><b>Languages: </b>{countryLanguages}</p>
                            </div>
                        </div>
                        <div className="BorderCountries"> 
                            <h3>Border Countries:</h3>
                            <div className="Borders">{countryBorders}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        );
    }
}
export default Detail;
