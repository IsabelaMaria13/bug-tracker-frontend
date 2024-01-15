import React, { useEffect, useState} from "react";
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Toolbar from "./Toolbar";
import Dashboard from "./Dashboard";
import { useUserContext } from "./UserContext";
import "./Home.css";
import { getProfilUser } from "./auth.service";

function Home() {
  const { setBugs, setSelectedProjectId, selectedProjectId  } = useUserContext();
  const [userProfile, setUserProfile] = useState(null);
  const { projects } = useUserContext();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const userProfileData = await getProfilUser(token);
        setUserProfile(userProfileData);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [setBugs, setSelectedProjectId]);

  return (
    <div>
      <Toolbar userProfile={userProfile} />
      <div className="background-site">
        <Container>
          <Row className="justify-content-center">
            {selectedProjectId && projects.length > 0 && (
              <h2 className='project-title custom-style'>
                {projects.find(project => project.id === selectedProjectId)?.projectName}
              </h2>
            )}
            <Col className="mb-3">
              <Dashboard 
              headerTitle="To Do"
              nextStatus="In Progress"
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
              headerTitle="In Progress"
              nextStatus="Verification"
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
              headerTitle="Verification"
              nextStatus="Verification Done"
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
                headerTitle="Verification Done"
                nextStatus="Done"
              />
            </Col>
            <Col className="mb-3">
              <Dashboard
                headerTitle="Done"
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
