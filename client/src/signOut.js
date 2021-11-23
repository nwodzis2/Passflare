import React from 'react';
import {Container} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

class SignOut extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        localStorage.removeItem("passflareAuth");
    }

    render() {
        return(
            <Container fluid>
                <Redirect to="/"/>
            </Container>
        );
    }
}

export default SignOut;