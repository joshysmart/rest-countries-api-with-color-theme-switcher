import React, { Component } from 'react';
import Header from './home-component/Header';
import SearchResults from './home-component/SearchResults';
import SearchSection from './home-component/SearchSection';



class Home extends Component {

    render() {
        return (
            <div className={`App ${this.props.state.DarkMode ? "DarkMode" : 'Light'}`}>
                <Header
                    toggleMode={this.props.toggleMode}
                    state={this.props.state}
                />
                <SearchSection
                    handleChange={this.props.handleChange}
                    handleSubmit={this.props.handleSubmit}
                    handleSelect={this.props.handleSelect}
                    state={this.props.state}
                />
                <SearchResults
                    state={this.props.state}
                    handleClick={this.props.handleClick}
                    toggleMode={this.props.toggleMode}
                />
            </div>

        );
    }
}

export default Home;