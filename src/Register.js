import React from 'react';
import './Register.css';
import {Container, Row, Col, Form, Button, Card, Modal} from "react-bootstrap"

const Register = () => {

    return (
        <div className="background-site">
        <Container className="site-container">
            <Row>
                <Col>
                    <h1 className="register-header">Register as</h1>
                </Col>
            </Row>
            <Row>
                <Col className="register-option">
                    <h1>As Tester</h1>
                    <Button variant="dark" className="register-button">
                        Continue as Tester
                    </Button>
                </Col>
                <Col className="register-option">
                    <h1>As Project Member</h1>
                    <Button variant="dark" className="register-button">
                        Continue as Project Member
                    </Button>
                </Col>
            </Row>
        </Container>
        <div className="text-center mt-3 white-text">
                ©CTRL+C/CTRL+V DEV TEAM
            </div>
    </div>
    )
};   

export default Register;