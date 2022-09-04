import PageLayout from './pages/PageLayout';
import LoginPage from './pages/LoginPage';
import RegistrationForm from './pages/SignupPage';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';
import { Route } from "react-router-dom";
import './css/App.css';
import NotFound from './pages/ErrorStatus/NotFound';
import NotAuthorized from './pages/ErrorStatus/NotAuthorized';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div className="wrap">
        <Router>
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route path='/login' render={() => {
              return localStorage.getItem('token') ?
                <Redirect to="/admin" />
                :
                <LoginPage />
            }} />

            <Route path='/signup' render={() => {
              return localStorage.getItem('token') ?
                <Redirect to="/admin" />
                :
                <RegistrationForm />
            }} />

            <Route path='/admin' render={() => {
              return localStorage.getItem('token') ?
                <PageLayout {...this.props}>
                  <BaseRouter />
                </PageLayout>
                :
                <NotAuthorized />
            }} />

            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);