import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Header, LoginPage} from "./userLogin.js";
import UserView from "./userView.js";
import AccountCreation from "./createAccount.js";
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";



//Routing still needs done, for now replace Component under 'Header' with whatever you want to render
ReactDOM.render(
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/userView" component={UserView}/>
        <Route exact path="/UserCreation" component={AccountCreation}/>
      </Switch>
    </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
