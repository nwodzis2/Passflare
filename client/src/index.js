import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals.js';
import Helmet from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorHandler from './errorHandler.js';
import LoginPage from "./userLogin.js";
import UserView from "./userView.js";
import EventSearch from "./eventSearch.js";
import AccountCreation from "./createAccount.js";
import Payment from "./payment.js";
import GatekeeperVerification from "./gatekeeperVerification.js";
import UserVerification from "./userVerification.js";
import AdminLogin from "./adminLogin.js";
import AdminCreation from "./createAdmin.js";
import { AdminDashboard } from "./adminView.js";
import AdminUsers from './adminUsers.js';
import AdminGatekeeper from "./adminGatekeeper.js";
import AdminEvents from "./adminEvents.js";
import AccountEdit from "./editAccount.js";
import AdminFinancials from './adminFinancials.js';
import EventDetails from "./eventDetails.js";
import GatekeeperView from "./gateKeeperView.js";
import FAQ from "./FAQ.js";
import { BrowserRouter as Router,
  Switch, Route, Link, Redirect, withRouter} from "react-router-dom";
import { setUncaughtExceptionCaptureCallback } from 'process';
import { Container } from 'react-bootstrap';


class Header extends React.Component{
  render(){
    return(
      <Helmet>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta http-equiv="ScreenOrientation" content="autoRotate:disabled"/>
        <title>Passflare Login</title>
        <meta name="description" content=""/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous"/>        
        <link href='https://fonts.googleapis.com/css?family=Aclonica' rel='stylesheet'/>
        <link href="https://fonts.googleapis.com/css?family=Abel" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>
        <meta name="apple-mobile-web-app-title" content="Passflare"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <link rel="stylesheet" href="styles.css"></link>
        {/* iPhone X (1125px x 2436px) */}
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="/passflareLogo.png"></link>
        {/* iPhone 8, 7, 6s, 6 (750px x 1334px) */}
        <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="/passflareLogo.png"></link>
        {/* iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) */}
        <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="/passflareLogo.png"></link>
        {/* iPhone 5 (640px x 1136px) */}
        <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="/passflareLogo.png"></link>
        {/* iPad Mini, Air (1536px x 2048px) */}
        <link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" href="/passflareLogo.png"></link>
        {/* iPad Pro 10.5" (1668px x 2224px) */}
        <link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" href="/passflareLogo.png"></link>
        {/* iPad Pro 12.9" (2048px x 2732px) */}
        <link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" href="/passflareLogo.png"></link>
        {/*icon for ios*/}
        <link rel="apple-touch-icon" sizes="180x180" href="/passflareLogo.png"></link>
        
      </Helmet>
    );
  }
}


class PageRouter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: "invalid"
    }

    this.setAuth = this.setAuth.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
  }

  setAuth(receievedAuth) {
    this.setState({auth: receievedAuth});
  }

  checkAuth(routeType, routeComponent) {
    if (routeType == "login") {
      return React.createElement(withRouter(routeComponent), {setAuth: this.setAuth});
    }
    if ((this.state.auth == "validUser" && routeType == "user") || 
      (this.state.auth == "validAdmin" && routeType == "admin") ||
      (this.state.auth == "validGatekeeper" && routeType == "gatekeeper") ||
      routeType == "verification" ||
      routeType == "misc" ||
      routeType == "account" ||
      (this.state.auth != "invalid" && routeType == "edit")) {
      return React.createElement(withRouter(routeComponent));
    }
    return <Redirect to="/"/>
  }

  render() {
    return(
      <Router>
        <Switch>
          {/*Login routes */}
          <Route exact path="/" render={() => this.checkAuth("login", LoginPage)}/>
          <Route path="/adminLogin" render={() => this.checkAuth("login", AdminLogin)}/>
          
          {/*Account routes */}
          <Route path="/userCreation" render={() => this.checkAuth("account", AccountCreation)}/>
          <Route path="/adminCreation" render={() => this.checkAuth("account", AdminCreation)}/>

          {/*Edit routes */}
          <Route path="/editAccount" render={() => this.checkAuth("edit", AccountEdit)}/>

          {/*User routes */}
          <Route path="/userView" render={() => this.checkAuth("user", UserView)}/>
          <Route path="/payment" render={() => this.checkAuth("user", Payment)} />
          <Route path="/eventSearch" render={() => this.checkAuth("user", EventSearch)}/>
          <Route path="/eventDetails" render={() => this.checkAuth("user", EventDetails)}/>
        
          {/*Verification routes */}
          <Route path="/userVerification/:email/:orgID" render={() => this.checkAuth("verification", UserVerification)}/>
          <Route path="/gatekeeperVerification/:email" render={() => this.checkAuth("verification", GatekeeperVerification)}/>

          {/*Gatekeeper routes */}
          <Route path="/gatekeeperView" render={() => this.checkAuth("gatekeeper", GatekeeperView)}/>
        
          {/*Admin routes */}
          <Route path="/adminView" render={() => this.checkAuth("admin", AdminDashboard)}/>
          <Route path="/adminGatekeeper" render={() => this.checkAuth("admin", AdminGatekeeper)}/>
          <Route path="/adminUsers" render={() => this.checkAuth("admin", AdminUsers)}/>
          <Route path="/adminEvents" render={() => this.checkAuth("admin", AdminEvents)}/>
          <Route path="/adminFinancials" render={() => this.checkAuth("admin", AdminFinancials)}/>
        
          {/*Misc. routes */}
          <Route exact path="/faq" component={FAQ} /> 
        
        </Switch>
      </Router>
    );
  }
}


//Routing still needs done, for now replace Componont of the Route with path "/" with whatever you want to render
ReactDOM.render(
        <Container fluid>
          <Header/>
          <PageRouter/>
        </Container>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default Header;
