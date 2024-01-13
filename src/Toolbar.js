import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown, Button, Modal, Form } from "react-bootstrap";
import "./Toolbar.css";
import { useUserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { logoutUser, getProfilUser } from "./auth.service";
import ProjectComponent from './Project';

const API_URL = 'http://localhost:3001/api';

const Toolbar = ({userProfile}) => {
  const { bugs, addBug } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Priority");
  const [assignTo, setAssignTo] = useState("");
  const [bugTitle, setBugTitle] = useState("");
  const [link, setLink] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleShowProjectModal = () => setShowProjectModal(true);
  const handleCloseProjectModal = () => setShowProjectModal(false);

  const handleSelectedPriority = (eventKey) => {
    setSelectedItem(eventKey);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBug({
      title: bugTitle,
      priority: selectedItem,
      details: additionalInfo,
      issueLink: link,
      assignedTo: "",
    });
    setShowModal(false);
    setBugTitle("");
    setLink("");
    setAdditionalInfo("");
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
    handleCloseLogoutModal();
  };

  const fetchAllProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await fetchAllProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectSelect = (projectId) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="toolbar">
      <span className="logo">BugMaster</span>
      <ProjectComponent />
      {projects.length > 0 && (
        <DropdownButton id="dropdown-bugs" title="Choose a Project">
          {projects.map((project) => (
            <Dropdown.Item
              key={project.id}
              eventKey={project.id}
              onSelect={() => handleProjectSelect(project.id)}
            >
              {project.projectName}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      )}
      <Button
        variant="outline-primary"
        className="add-bug-btn"
        onClick={handleShowModal}
      >
        Add Bug
      </Button>
      <span className="user-info">
        {userProfile && userProfile.email}  
        <div className="user-icon" onClick={handleShowLogoutModal}>
          👤
        </div>
      </span>

      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogoutModal}>
            No
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="modal-background"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="model-title">ADD BUG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Title"
                value={bugTitle}
                onChange={(e) => setBugTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <DropdownButton
                id="dropdown-priority"
                title={selectedItem}
                onSelect={handleSelectedPriority}
                className="w-100"
              >
                <Dropdown.Item eventKey="Low">Low</Dropdown.Item>
                <Dropdown.Item eventKey="Medium">Medium</Dropdown.Item>
                <Dropdown.Item eventKey="High">High</Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Link Github"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Additional information"
                onChange={(e) => setAdditionalInfo(e.target.value)}
                maxLength={500}
              />
            </Form.Group>
            <Button type="submit" variant="dark" className="w-100">
              ADD
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Toolbar;
