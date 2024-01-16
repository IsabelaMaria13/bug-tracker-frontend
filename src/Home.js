import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Toolbar from "./Toolbar";
import Dashboard from "./Dashboard";
import { useUserContext } from "./UserContext";
import "./Home.css";
import { getProfilUser } from "./auth.service";

const API_URL = "http://localhost:3001/api";

function Home() {
  const { triggerUpdate, setBugs, setSelectedProjectId, selectedProjectId, projects  } = useUserContext();
  const [userProfile, setUserProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const [updatedProjectName, setUpdatedProjectName] = useState("");
  const [updatedRepositoryName, setUpdatedRepositoryName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userProfileData = await getProfilUser(token);
        setUserProfile(userProfileData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [setBugs, setSelectedProjectId]);

  useEffect(() => {
    // Simulate the selection of the same project
    triggerUpdate();
  }, []);
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
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
        throw new Error("Failed to update project");
      }

      const result = await response.json();

      setProjectName(updatedProjectName);
      setRepositoryName(updatedRepositoryName);

      handleCloseModal();
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
          <Row className="justify-content-center">
            <Col className="mb-3">
              <Dashboard headerTitle="To Do" nextStatus="In Progress" />
            </Col>
            <Col className="mb-3">
              <Dashboard headerTitle="In Progress" nextStatus="Verification" />
            </Col>
            <Col className="mb-3">
              <Dashboard
                headerTitle="Verification"
                nextStatus="Verification Done"
              />
            </Col>
            <Col className="mb-3">
              <Dashboard headerTitle="Verification Done" nextStatus="Done" />
            </Col>
            <Col className="mb-3">
              <Dashboard headerTitle="Done" nextStatus="Closed Issue" />
            </Col>
          </Row>
        </Container>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
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
            <p className="text">We apologize, we can only view the details, no editing rights.</p>
          </Modal.Body>
        ) : null}
        <Modal.Footer>
          <>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            {userProfile && userProfile.role === "MP" && (
              <Button variant="primary" onClick={handleSave}>
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
