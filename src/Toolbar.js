import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown, Button, Modal, Form } from "react-bootstrap";
import "./Toolbar.css";
import { useUserContext } from "./UserContext";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './auth.service';

const Toolbar = ({ email }) => {
  const { bugs, addBug } = useUserContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Priority");
  const [bugTitle, setBugTitle] = useState("");
  const [reporter, setReporter] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [link, setLink] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const navigate = useNavigate();


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleSelectedPriority = (eventKey) => {
    setSelectedItem(eventKey);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBug({
      title: bugTitle,
      priority: selectedItem,
      reporter: reporter,
      assignTo: assignTo,
      link: link,
      additionalInfo: additionalInfo,
    });
    setShowModal(false);
    setBugTitle("");
    setReporter("");
    setAssignTo("");
    setLink("");
    setAdditionalInfo("");
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    handleCloseLogoutModal();
  };

  return (
    <div className="toolbar">
      <span className="logo">BugMaster</span>
      <DropdownButton id="dropdown-bugs" title="Choose a Project">
        {bugs.map((bug, index) => (
          <Dropdown.Item
            key={index}
            eventKey={bug.title}
            onSelect={handleSelectedPriority}
          >
            {bug.title}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Button
        variant="outline-primary"
        className="add-bug-btn"
        onClick={handleShowModal}
      >
        Add Bug
      </Button>
      <span className="user-info">
        {email}
        <div className="user-icon" onClick={handleShowLogoutModal}>
          👤
        </div>
      </span>

      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
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
                placeholder="Reporter"
                value={reporter}
                onChange={(e) => setReporter(e.target.value)}
                required
                className="w-100"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Assign to"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                className="w-100"
              />
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
