import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/Detail';
import Error from './components/Error';
import './css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      "api": "https://restcountries.com/v3.1",
      "loading": false,
      "countries": [],
      "country": {},
      "from": 0,
      "to": 16,
      "text": "Filter by Region",
      "countryName": "Nigeria",
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
        // console.dir(data[0])
        if (data.status === 404) {
          this.setState({
            "error": true,
            loading: false
          })
        } else {
          this.setState(prev => {
            return {
              ...prev,
              countries: data,
              loading: false
            }
          });
        }
      });
  }

  componentDidMount() {
    this.getData(`${this.state.api}/all`);
  }

  handleClick() {
    this.setState(prev => {
      return {
        ...prev,
        "from": prev.from,
        "to": prev.to + 12
      }
    })
  }

  handleChange(e) {
    console.log("changing")
    this.setState({
      "countryName": e.target.value,
      "error": false
    });
  }


  handleSubmit(e) {
    e.preventDefault();
    const url = `${this.state.api}/name/${this.state.countryName}`;
    this.getData(url);
  }

  handleSelect(e) {
    const text = e.target.textContent;
    const url = `${this.state.api}/region/${text}`
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
      <>
        <Switch>
          <Route path='/' render={() => <Home
            state={this.state}
            toggleMode={this.toggleMode}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleSelect={this.handleSelect}
            handleClick={this.handleClick}
          />} exact />
          <Route path='/detail/:alpha3Code'
            render={(props) => <Detail
              {...props}
              state={this.state}
              toggleMode={this.toggleMode}
              exact
            />} />
          <Route component={Error} />
        </Switch>
      </>
    );
  }
}

export default App;
