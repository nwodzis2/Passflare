import React, { Component } from 'react';
import reportWebVitals from './reportWebVitals';
import UserCode from "./enterCodeLogin.js";
import GatekeeperLoginPage from "./gatekeeperLogin.js";
import Passes from "./passes.js";

//Routing still needs done, for now replace Component under 'Header' with whatever you want to render
ReactDOM.render(
    <Router>
      <Header/>
      <Passes/>
    </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
