import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, FormLabel, FormControl} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {AdminNav} from "./adminView.js";
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';
class AdminUsers extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Container fluid>
            <AdminNav adminData={this.props.location.state.adminData} masterData={this.props.location.state.masterData}/>
            <UsersData adminData={this.props.location.state.adminData} masterData={this.props.location.state.masterData}/>
            <EmailUser adminData={this.props.location.state.adminData} masterData={this.props.location.state.masterData}/>
            <UserGraph adminData={this.props.location.state.adminData} masterData={this.props.location.state.masterData}/>
        </Container>
        )
    }
}
class UserGraph extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          userDet : [],
          orgID : this.props.adminData.OrgID,
          userData : [],
          crosshairValues: []
        }
      }
      componentWillMount(){
        axios.post("/user/orgID", {orgID: this.state.orgID}).then((response) => {
          this.setState({userDet: response.data});
          var coords = {}
          var coordsArray = []
          for(const t of response.data){
            var timestamp = t._id.toString().substring(0,8)
            var date = new Date( parseInt( timestamp, 16 ) * 1000 )
            date = date.toLocaleString("en-US", {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit'})
            coords[date] = (coords[date] + 1) || 1
          }
          for (var d in coords){
            coordsArray.push({x : d, y : coords[d]})
          }
          this.setState({userData : coordsArray})
        });
      }
      _onMouseLeave = () => {
        this.setState({crosshairValues: []});
      };
      _onNearestX = (value, index) => {
        this.setState({crosshairValues: this.state.userData});
      };
    render(){
        return(
            <Container fluid className="user-graph-sect-container">
                <h2>Users over time</h2>
                <div className="event-graph-container bg-dark">
                    <XYPlot onMouseLeave={this._onMouseLeave} width={300} height={300} xType="ordinal">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineSeries onNearestX={this._onNearestX} data={this.state.userData} />
                    <Crosshair
                        values={this.state.crosshairValues}
                        className={'test-class-name'}
                    />
                    </XYPlot>
                </div>
            </Container>
        )
    }
}
class UsersData extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }

        this.getOrgUsers = this.getOrgUsers.bind(this);
    }

    componentWillMount(){
        this.getOrgUsers();
    }

    getOrgUsers(){
        axios.post("/user/orgID", {orgID: this.props.adminData.OrgID}).then(function(response){
            console.log(response.data);
        });

    }

    render(){
        return(
            <Container fluid>
            </Container>
        );
    }
}

class EmailUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.onSubmit= this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async onSubmit(event){
        event.preventDefault();
        var self = this;
        var orgID = this.props.adminData.OrgID;
        
        const response = await axios.post("/organization/orgID", {orgID: orgID});
        console.log(response);
        axios.get("/admin/sendUserMail", {params: {email: self.state.email, orgName: response.data[0].Name, orgID: orgID}});
        
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render(){
        return(
        <Container fluid>
            <Row>
                <Col md="12">
                    <Card className="darkCard">
                        <Card.Title>Copy and email this link to invite users:</Card.Title>                            
                        <br/>
                            <Row>
                                <p>http://passflare.herokuapp.com/userCreation/{this.props.adminData.OrgID}</p> 
                            </Row> 
                    </Card>
                </Col>
            </Row>
        </Container>
        );
    }
}
export default AdminUsers;