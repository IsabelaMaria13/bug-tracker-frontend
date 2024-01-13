import React, { useEffect, useState} from "react";
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
import { getProfilUser } from "./auth.service";

function Home() {
  const location = useLocation();
  const { email } = location.state || {};
  const { bugs, setBugs } = useUserContext();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const userProfileData = await getProfilUser(token);
        setUserProfile(userProfileData);
        
        // setBugs(userProfile.projects);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [setBugs]);

  return (
    <div>
      <Toolbar userProfile={userProfile} />
      <div className="background-site">
        <Container>
          <Row className="justify-content-center">
            <Col className="mb-3">
              <Dashboard 
              headerTitle="TO DO"
              bugs={bugs.filter(bug => bug.status === 'TO DO')} 
              nextStatus="In progress"
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
              headerTitle="In progress"
              bugs={bugs.filter((bug) => bug.status === "In progress")}
              nextStatus="Verification"
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
              headerTitle="Verification"
              bugs={bugs.filter((bug) => bug.status === "Verification")}
              nextStatus="Verification Done"
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
                headerTitle="Verification Done"
                bugs={bugs.filter((bug) => bug.status === "Verification Done")}
                nextStatus="Done"
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
                headerTitle="Done"
                bugs={bugs.filter((bug) => bug.status === "Done")}
                nextStatus="Closed Issue"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default Home;
