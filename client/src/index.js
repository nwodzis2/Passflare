import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserCode from "./enterCodeLogin.js";
import GatekeeperLoginPage from "./gatekeeperLogin.js";
import Passes from "./passes.js";
import {Header, LoginPage} from "./userLogin.js";
import AccountCreation from "./createAccount.js";
import AccountEdit from "./editAccount.js";
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
import UserView from "./userView.js";
import EventDetails from "./eventDetails.js";

//Routing still needs done, for now replace Component under 'Header' with whatever you want to render
ReactDOM.render(
    <Router>
      <Header/>
      <UserView/>
    </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
