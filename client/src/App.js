import React, { Component } from 'react';
import { Route } from "react-router-dom";
import UserCode from "./enterCodeLogin.js";
import GatekeeperLoginPage from "./gatekeeperLogin.js";
import Passes from "./passes.js";
import {Header, LoginPage} from "./userLogin.js";
import Payment from "./payment";
function App() {
  return (
    <div>
      <Header/>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path="/passes">
        <Passes />
      </Route>
      <Route path="/payment">
        <Payment />
      </Route>
    </div>
  );
}

export default App;