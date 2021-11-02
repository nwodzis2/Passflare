import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Helmet from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./userLogin.js";
import {UserView, UserNav} from "./userView.js";
import EventSearch from "./eventSearch.js";
import AccountCreation from "./createAccount.js";
import Payment from "./payment";
import Passes from "./passes.js";
import GatekeeperVerification from "./gatekeeperVerification.js";
import AdminNav from "./adminView.js";
import EventCreation from "./eventCreation.js";
import EmailGatekeeper from "./addGatekeeper.js";
import AccountEdit from "./editAccount.js";
import GatekeeperView from "./gateKeeperView";
import { BrowserRouter as Router,
  Switch, Route, Link} from "react-router-dom";
  import App from './App';

  class Header extends React.Component{
    render(){
      return(
        <Helmet>
          <meta charset="utf-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Passflare Login</title>
          <meta name="description" content=""/>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"/>        
          <link href='https://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet'/>
          <link href="https://fonts.googleapis.com/css?family=Abel" rel="stylesheet" />
          <link rel="stylesheet" href="styles.css"></link>
          
        </Helmet>
      );
    }
  }

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
        <Route exact path="/eventSearch">
          <EventSearch/>
        </Route>
        <Route exact path="/gatekeeperVerification/:email">
          <GatekeeperVerification/>
        </Route>
        <Route exact path="/gatekeeperView">
          <GatekeeperView/>
        </Route>
        <Route exact path="/adminView">
          <AdminNav/>
        </Route>
        <Route exact path="/eventCreation">
          <EventCreation/>
        </Route>
        <Route exact path="/addGatekeepers">
          <EmailGatekeeper/>
        </Route>
        <Route exact path="/editAccount">
          <AccountEdit/>
        </Route>
      </Switch>
    </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default Header;