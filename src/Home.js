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

function Home(){
    const location = useLocation();
    const { email } = location.state;
    return(
        <div><Toolbar email={ email }/></div>
    )
}
export default Home;