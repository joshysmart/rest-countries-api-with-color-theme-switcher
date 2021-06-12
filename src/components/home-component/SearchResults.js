import React, { Component } from "react"
import { FaAngleUp } from "react-icons/fa";
import { Link } from 'react-router-dom'

class SearchResults extends Component {
    constructor() {
        super();
        this.scrollbutton = React.createRef();
        this.handleScrollClick = this.handleScrollClick.bind(this);
    }

    componentDidMount() {
        if(this.scrollbutton.current) {
            window.onscroll = () => this.handleScroll();
        }
    }

    handleScroll() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            this.scrollbutton.current.classList.add("displayScroll");
        } else {
            this.scrollbutton.current.classList.remove("displayScroll");
        }
        // console.log("Sxrolling");
        // console.log(this.scrollbutton.current)
    }

    handleScrollClick() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        console.log("this")
    }


    render() {
        const { from, to, countries, loading } = this.props.state;
        const GridItem = countries.slice(from, to).map((country, i) =>
            <Link
                to={{
                    pathname: "/detail",
                    state: { 
                        name: country.name,
                        flag: country.flag,
                        nativeName: country.nativeName,
                        population: country.population,
                        region: country.region,
                        subregion: country.subregion,
                        capital: country.capital,
                        topLevelDomain: country.topLevelDomain,
                        currencies: country.currencies,
                        languages: country.languages,
                        borders: country.borders
                    }
                }}
                key={i}
            >
                <div className="GridItem">
                    <div className="Flag">
                        <img src={country.flag} alt="" />
                    </div>
                    <div className="Description">
                        <h3 className="Country">{country.name}</h3>
                        <p className="Population"><b>Population:</b> {`${country.population}`.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                        }</p>
                        <p className="Region"><b>Region:</b> {country.region}</p>
                        <p className="Capital"><b>Capital:</b> {country.capital}</p>
                    </div>
                </div>
            </Link>

        );

        return (
            <section className="SearchResults">
                <div className="ResultsGrid">
                    {GridItem}
                </div>
                <div><button className={`LoadMore ${loading && "DisplayLoadMore"}`} onClick={this.props.handleClick}>Show more countries</button></div>
                <div><button className="Scroll" onClick={this.handleScrollClick} ref={this.scrollbutton}><FaAngleUp /></button></div>
                <div className={`Loading ${loading && "DisplayLoading"}`}>
                    <div className="Box1"></div>
                    <div className="Box2"></div>
                </div>
            </section>
        )
    }
}

export default SearchResults