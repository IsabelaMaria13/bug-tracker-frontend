import React from 'react';
import styles from './Register.module.css';
import {Container, Row, Col, Form, Button, Card, Modal} from "react-bootstrap"

const Register = () => {

    return (
        <div className={styles.backgroundSite}>
        <Container className={`site-container ${styles.siteContainer}`}>
            <Row>
                <Col>
                    <h1 className={styles.registerHeader}>Register as</h1>
                </Col>
            </Row>
            <Row>
                <Col className={styles.registerOption}>
                    <h1>As Tester</h1>
                    <Button variant="dark" className={styles.registerButton}>
                        Continue as Tester
                    </Button>
                </Col>
                <Col className={styles.registerOption}>
                    <h1>As Developer</h1>
                    <Button variant="dark" className={styles.registerButton}>
                        Continue as Project Member
                    </Button>
                </Col>
            </Row>
        </Container>
        <div className={`text-center mt-3 white-text ${styles.textCenter}`}>
                ©CTRL+C/CTRL+V DEV TEAM
        </div>
    </div>
    )
};   

export default Register;
