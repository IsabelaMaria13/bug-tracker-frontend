import React from "react";
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import Toolbar from "./Toolbar";
import Dashboard from "./Dashboard";
import { useUserContext } from "./UserContext";
import "./Home.css";

function Home() {
  const location = useLocation();
  const { email } = location.state || {};
  const { bugs } = useUserContext();

  return (
    <div>
      <Toolbar email={email} />
      <div className="background-site">
        <Container>
          <Row className="justify-content-center">
            <Col className="mb-3">
              <Dashboard 
              headerTitle="TO DO"
              bugs={bugs.filter(bug => bug.status === 'TO DO')} 
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
              headerTitle="In progress"
              bugs={bugs.filter((bug) => bug.status === "In progress")}
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
              headerTitle="Verification"
              bugs={bugs.filter((bug) => bug.status === "Verification")}
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
                headerTitle="Verification Done"
                bugs={bugs.filter((bug) => bug.status === "Verification Done")}
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
                headerTitle="Done"
                bugs={bugs.filter((bug) => bug.status === "Done")}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Home;
