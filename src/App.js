import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Detail from './components/Detail';
import Error from './components/Error';
import './css/App.css';

class App extends Component {


  render() {
    return (
      <>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/detail' component={Detail} />
          <Route component={Error} />
        </Switch>
      </>
    );
  }
}

export default App;
