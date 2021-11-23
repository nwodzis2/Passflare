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

        this.state = {
            loading: true,
            userDataList: null
        }

        this.getOrgUsers = this.getOrgUsers.bind(this);
    }

    componentWillMount(){
        this.getOrgUsers();
    }

    deleteUser(userID) {
        var self = this;
        axios.post("user/delete/id", {id: userID}).then(function(res){
            self.getOrgUsers();
        });
    }

    getOrgUsers = async () => {
        
        var users = [];
        const usersRes = await axios.post("/user/orgID", {orgID: this.props.location.state.adminData.details.OrgID});
        for (let i = 0; i < usersRes.data.length; ++i) {
            users.push(usersRes.data[i]);
        }


        var admins = [];
        const adminsRes = await axios.post("/admin/orgID", {orgID: this.props.location.state.adminData.details.OrgID});
        for (let i = 0; i < adminsRes.data.length; ++i) {
            admins.push(adminsRes.data[i]);
        }


        var userListItems = [];
        for (let i = 0; i < users.length; ++i) {
            var isAdmin = false;
            for (let j = 0; j < admins.length; ++j) {
                if (admins[j].UserID == users[i]._id) {
                    isAdmin = true;
                }
            }
            if (!isAdmin) {
                userListItems.push(
                <Row className="adminEventDataRow">
                    <Col style={{border: "1px solid rgba(0, 0, 0, 0)"}}>
                        <p>{users[i]._id}</p>
                    </Col>
                    <Col>
                        <p>{users[i].Name}</p>
                    </Col>
                    <Col>
                        <p>{users[i].Email}</p>
                    </Col>
                    <Col>
                        <p>{users[i].Number}</p>
                    </Col>
                    <Col>
                        <button onClick={() => this.deleteUser(users[i]._id)} className="btn btn-dark passBtnDark-sm"> 
                            Delete
                        </button>
                    </Col>
                </Row>
                );
            }
        }

        this.setState({userDataList: userListItems, loading: false});
    }

    render(){
        return(
        <Container fluid style={{padding: "0px 20px"}}>
            <AdminNav adminData={this.props.location.state.adminData}/>
            <Row>
                <Col style={{maxWidth: "25%"}}>
                    <EmailUser adminData={this.props.location.state.adminData.details}/>
                </Col>
                <Col style={{border: "1px solid rgb(255, 124, 37)", marginLeft: "20px", padding: "16px 20px"}}> 
                    <UsersData adminData={this.props.location.state.adminData.details} parentState={this.state}/>
                </Col>
            </Row>
            <Row>
                <UserGraph adminData={this.props.location.state.adminData.details}/>
            </Row>
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
                <h2 style={{textAlign: "left", margin: "0px"}}>Users over time</h2>
                <hr style={{margin: "16px 0px"}}/>
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
    }

    getOrgUsers(){
        axios.post("/user/orgID", {orgID: this.props.adminData.OrgID}).then(function(response){
            console.log(response.data);
        });

    }

    render(){
        if (this.props.parentState.loading) {
            return(
                <Container style={{padding: "0px"}} fluid>
                    <p>Loading...</p>
                </Container>
            );
        } else {
            return(
                <Container style={{padding: "0px"}} fluid>
                    <Row className="adminEventDataRowKey">
                        <Col style={{border: "1px solid rgba(0, 0, 0, 0)"}}>
                            <p>ID:</p>
                        </Col>
                        <Col>
                            <p>Name:</p>
                        </Col>
                        <Col>
                            <p>Email:</p>
                        </Col>
                        <Col>
                            <p>Phone Number:</p>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row style={{margin: "0px"}}>
                        {this.props.parentState.userDataList}
                    </Row>
                </Container>
            );
        }
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
            <Col style={{margin: "0px -12px"}}>
                <Card className="darkCard">
                    <Card.Title>Copy and email this link to add users to your organization:</Card.Title>                            
                    <br/>
                         <Row>
                            <p>http://passflare.herokuapp.com/userCreation/{this.props.adminData.OrgID}/user</p> 
                        </Row> 
                </Card>
            </Col>
        );
    }
}
export default AdminUsers;