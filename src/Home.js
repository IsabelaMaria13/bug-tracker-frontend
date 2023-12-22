import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from 'react-router-dom';
import Toolbar from "./Toolbar";
import Dashboard from "./Dashboard";

function Home(){
    const location = useLocation();
    const { email } = location.state || {};
    return(
        <div><Toolbar email={ email }/>
        <Container>
            <Row className="justify-content-center">
            {[...Array(5)].map((_, index) => ( 
          <Col key={index} md={2} className="mb-3">
            <Dashboard headerTitle={`${index + 1}`} />
          </Col>
        ))}
            </Row>
        </Container>
        </div>
    );
}
export default Home;