import React, { Component } from 'react';
import logo from './logo.svg';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 

import './App.css';
import Header from './components/header/header';
import SelectAndFrom from './components/selectandform/selectandform';
import ResultAndSearch from './components/resultandserach/resultandsearch';
import Auth from './components/auth/auth';
import * as actions from './store/actions/index'; 

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>  
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route exact path="/" component={SelectAndFrom} />
          <Route exact path="/results" component={ResultAndSearch} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Header />
        {routes}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
