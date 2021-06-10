import React, { Component } from 'react';
import Header from './home-component/Header';
import SearchResults from './home-component/SearchResults';
import SearchSection from './home-component/SearchSection';



class Home extends Component {
    constructor() {
        super();
        this.state = {
            "api": "https://restcountries.eu/rest/v2/all",
            "loading": false,
            "countries": [],
            "from": 0,
            "to": 10,
            "text": "Filter by Region",
            "country": "Nigeria",
            "error": false,
            "DarkMode": false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
    }

    getData(endpoint) {
        this.setState({ loading: true })
        fetch(endpoint)
            .then(blob => blob.json())
            .then(data => {
                if (data.status === 404) {
                    this.setState({ "error": true })
                } else {
                    this.setState(prev => {
                        return {
                            ...prev,
                            "countries": [...data],
                            "loading": false
                        }
                    });
                }
            });
    }

    componentDidMount() {
        this.getData(this.state.api);
    }

    handleClick() {
        this.setState(prev => {
            return {
                ...prev,
                "from": prev.from,
                "to": prev.to + 10
            }
        })
    }

    handleChange(e) {
        this.setState({
            "country": e.target.value,
            "error": false
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        const url = `https://restcountries.eu/rest/v2/name/${this.state.country}`;
        this.getData(url);
    }

    handleSelect(e) {
        const text = e.target.textContent;
        const url = `https://restcountries.eu/rest/v2/region/${text}`
        this.setState({
            "text": text
        })
        this.getData(url)
    }

    toggleMode() {
        this.setState(prev => {
            return {
                "DarkMode": !prev.DarkMode
            }
        })
    }

    render() {
        return (
            <div className={`App ${this.state.DarkMode ? "DarkMode" : 'Light'}`}>
            <Header
            toggleMode={this.toggleMode}
            state={this.state}              
            />
            <SearchSection
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleSelect={this.handleSelect}
            state={this.state}
            />
            <SearchResults
            state={this.state}
            handleClick={this.handleClick}
            />
          </div>
    
        );
    }
}

export default Home;