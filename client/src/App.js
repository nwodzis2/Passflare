import React, { Component } from 'react';
import { Route } from "react-router-dom";
import GatekeeperLoginPage from "./gatekeeperLogin.js";
import Passes from "./passes.js";
import LoginPage from "./userLogin.js";
import Header from "./index.js";
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