import Faq from "react-faq-component";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { Container, Row, Col, Card, } from 'react-bootstrap';
import { BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const data = {
    title: "FAQ (How it works)",
    rows: [
        {
            title: "How do I purchase a pass?",
            content: `With money.`,
        },
        {
            title: "Where can I find events?",
            content:
                "Try searching for your school's or business' organization to see if they are hosting an event.",
        },
        {
            title: "Where do I find my purchased pass?",
            content: `Check the passes page. Alternatively you can also screen your QR code after purchase or add your pass to your virtual wallet. `,
        },
        {
            title: "What is the package version",
            content: <p>current version is 1.2.1</p>,
        },
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "blue",
    rowTitleColor: "blue",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

class FAQ extends React.Component {
    render() {
        return (
            <Container fluid>
                <div>
                    <Faq data={data} />
                </div>
            </Container>
        );
    }
}

export default FAQ; 
