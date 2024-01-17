import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Modal, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toolbar} from "./Toolbar";
import Dashboard from "./Dashboard";
import { useUserContext } from "./UserContext";
import "./Home.css";
import { getProfilUser } from "./auth.service";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:3001/api";

function Home() {
  const { bugs, selectedProjectId, projects, rerenderToolbar, setRerenderToolbar, setRerenderBugs } = useUserContext();
  const [userProfile, setUserProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const [updatedProjectName, setUpdatedProjectName] = useState("");
  const [updatedRepositoryName, setUpdatedRepositoryName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userProfileData = await getProfilUser(token);
        setUserProfile(userProfileData);

        if (!userProfileData) {
          navigate('/');
          return null;
        }

      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate('/');
      }
    };
    fetchUserProfile();
    setRerenderBugs(rerenderToolbar+1);
    
  }, [bugs, selectedProjectId]);

  useEffect(() => {
    if(selectedProjectId)
      { document.querySelector(".project-title").innerText = updatedProjectName; }
  }, [updatedProjectName])

  const handleShowModalForProjectDetails = () => {
    const project = projects.find((p) => p.id === selectedProjectId);
    if (project) {
      setProjectName(project.projectName);
      setRepositoryName(project.repositoryName);
      setUpdatedProjectName(project.projectName);
      setUpdatedRepositoryName(project.repositoryName);
    }
    setShowModal(true);
  };

  const handleCloseModifyProjectModal = () => {
    const project = projects.find((p) => p.id === selectedProjectId);
    document.querySelector(".project-title").innerText = project.projectName;
    setProjectName(project.projectName);
    setRepositoryName(project.projectName);
    setShowModal(false);
  };

  const handleUpdatedProjectModal = ()  => {
    setShowModal(false);
  }

  const handleSaveModifiedProject = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const body = JSON.stringify({
        projectName: updatedProjectName,
        repositoryName: updatedRepositoryName,
      });

      const response = await fetch(`${API_URL}/projects/${selectedProjectId}`, {
        method: "PATCH",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        alert("There has been an error saving your modified details. Please try again.");
        throw new Error("Failed to update project");
      } else {
        setProjectName(updatedProjectName);
        setRepositoryName(updatedRepositoryName);
        setRerenderToolbar(rerenderToolbar+1);
        handleUpdatedProjectModal();      
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <div>
      <Toolbar userProfile={userProfile} />
      <div className="background-site">
        <Container>
          {selectedProjectId && projects.length > 0 && (
            <h2
              className="project-title custom-style"
              onClick={handleShowModalForProjectDetails}
            >
              {
                projects.find((project) => project.id === selectedProjectId)
                  ?.projectName
              }
            </h2>
          )}
          {!selectedProjectId && (
            <h4
              className="selectProjectText custom-style"
            >
            Please select a project from the dropdown in order to see the bugs of it.
            </h4>
          )}
          <Row className="justify-content-center">
            <Col className="mb-3">
              {selectedProjectId && (<Dashboard headerTitle="To Do" nextStatus="In Progress" userProfile={userProfile} />)}
              
            </Col>
            <Col className="mb-3">
            {selectedProjectId && (              
            <Dashboard headerTitle="In Progress" nextStatus="Verification" userProfile={userProfile}/>
            )}
            </Col>
            <Col className="mb-3">
            {selectedProjectId && (<Dashboard
                headerTitle="Verification"
                nextStatus="Verification Done"
                userProfile={userProfile}
              />)}
            </Col>
            <Col className="mb-3">
            {selectedProjectId && (<Dashboard headerTitle="Verification Done" nextStatus="Done" userProfile={userProfile}/>)}
            </Col>
            <Col className="mb-3">
            {selectedProjectId && (<Dashboard headerTitle="Done" nextStatus="Closed Issue" userProfile={userProfile}/>
            )}
            </Col>
          </Row>
        </Container>
      </div>
      <Modal show={showModal} onHide={handleCloseModifyProjectModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        {userProfile && userProfile.role === "MP" ? (
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Project</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedProjectName}
                  onChange={(e) => setUpdatedProjectName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Repository</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedRepositoryName}
                  onChange={(e) => setUpdatedRepositoryName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
        ) : userProfile && userProfile.role === "TST" ? (
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Project</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedProjectName}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Repository</Form.Label>
                <Form.Control
                  type="text"
                  value={updatedRepositoryName}
                  readOnly 
                />
              </Form.Group>
            </Form>
            <p className="text">We apologize, as a Tester you can only view the details of the project, no editing rights.</p>
          </Modal.Body>
        ) : null}
        <Modal.Footer>
          <>
            <Button variant="secondary" onClick={handleCloseModifyProjectModal}>
              Close
            </Button>
            {userProfile && userProfile.role === "MP" && (
              <Button variant="primary" onClick={handleSaveModifiedProject}>
                Save
              </Button>
            )}
          </>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Home;
