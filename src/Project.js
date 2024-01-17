import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useUserContext } from "./UserContext";
import { fetchAllProjects } from "./Toolbar";

const API_URL = 'http://localhost:3001/api';

const ProjectComponent = () => {
  const { setSelectedProjectId, fetchBugsForProject} = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [repositoryName, setRepositoryName] = useState("");
  const [projectMembers, setProjectMembers] = useState([]);
  const [testers, setTesters] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchAllMPs();
    fetchAllTSTs();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchAllMPs = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`${API_URL}/users/MP`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch MPs");
      }

      const data = await response.json();
      const mpIDs = data.map((user) => user.id);
      setProjectMembers(mpIDs);
    } catch (error) {
      console.error("Error fetching MPs:", error);
    }
  };
  
  const fetchAllTSTs = async () => {
    try {
      const token = localStorage.getItem('token'); 
  
      const response = await fetch(`${API_URL}/users/TST`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch TSTs");
      }

      const data = await response.json();
      const tstIDs = data.map((user) => user.id);
      setTesters(tstIDs);
    } catch (error) {
      console.error("Error fetching TSTs:", error);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    const projectData = {
      repositoryName,
      projectName,
      projectMembers, 
      testers, 
    };
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" ,
        Authorization: `Bearer ${token}`,
    },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const newProjectsArray = await fetchAllProjects();

      const newProject = newProjectsArray.find((p) => p.repositoryName === projectData.repositoryName && p.projectName === projectData.projectName)

      setSelectedProjectId(newProject.id);
      setRepositoryName("");
      setProjectName("");
      fetchBugsForProject(newProject.id);
      handleCloseModal();
    } catch (error) {
      console.error("Error during project creation:", error);
    }
  };

  return (
    <>
      <Button
          variant="outline-primary"
          className="add-bug-btn"
          onClick={handleShowModal}>
        Add Project
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveProject}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </Form.Group><Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Repository name"
                value={repositoryName}
                onChange={(e) => setRepositoryName(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProject}>
            Save Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectComponent;
