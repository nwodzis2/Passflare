import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header, LoginPage} from "./userLogin.js";
import {UserView, UserNav} from "./userView.js";
import AccountCreation from "./createAccount.js";
import Payment from "./payment";
import Passes from "./passes.js";
import AdminNav from "./adminView.js";
import EventCreation from "./eventCreation.js";
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
  import App from './App';



//Routing still needs done, for now replace Componont of the Route with path "/" with whatever you want to render
ReactDOM.render(
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/userView">
          <UserView/>
          <UserNav/>
        </Route>
        <Route exact path="/UserCreation" component={AccountCreation}/>
        <Route exact path="/Passes">
          <Passes/>
        </Route>
        <Route exact path="/gatekeeperView">

        </Route>
        <Route exact path="/adminView">
          <AdminNav/>
        </Route>
        <Route exact path="/eventCreation">
          <EventCreation/>
        </Route>
      </Switch>
    </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
