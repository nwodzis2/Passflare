import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Helmet from "react-helmet";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from "./userLogin.js";
import UserView from "./userView.js";
import EventSearch from "./eventSearch.js";
import AccountCreation from "./createAccount.js";
import Payment from "./payment";
import Passes from "./passes.js";
import GatekeeperVerification from "./gatekeeperVerification.js";
import AdminLogin from "./adminLogin.js";
import AdminCreation from "./createAdmin.js";
import AdminNav from "./adminView.js";
import EventCreation from "./eventCreation.js";
import AccountEdit from "./editAccount.js";
import EventDetails from "./eventDetails.js";
import EmailGatekeeper from "./addGatekeeper.js";
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

//Routing still needs done, for now replace Componont of the Route with path "/" with whatever you want to render
ReactDOM.render(
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/userView" component={UserView}/>
        <Route exact path="/UserCreation" component={AccountCreation}/>
        <Route exact path="/Passes" component={Passes}/>
        <Route exact path="/eventSearch" component={EventSearch}/>
        <Route exact path="/gatekeeperVerification/:email" component={GatekeeperVerification}/>
        <Route exact path="/gatekeeperView" component={GatekeeperView}/>
        <Route exact path="/adminView" component={AdminNav}/>
        <Route exact path="/eventCreation" component={EventCreation}/>
        <Route exact path="/eventDetails" component={EventDetails}/>
        <Route exact path="/addGatekeepers" component={EmailGatekeeper}/>
        <Route exact path="/editAccount" component={AccountEdit}/>
        <Route exact path="/payment" component={Payment}/>
      </Switch>
    </Router>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default Header;