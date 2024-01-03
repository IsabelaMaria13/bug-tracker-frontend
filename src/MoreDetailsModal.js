import React from 'react';
import { Modal, Button, Form, DropdownButton, Dropdown } from 'react-bootstrap';

const MoreDetailsModal = ({ show, handleClose, resolution, setResolution, solution, setSolution, testing, setTesting, handleSave }) => {
  const handleSelectedResolution = (eventKey) => setResolution(eventKey);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Additional Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group className="mb-3">
            <Form.Label>Resolution</Form.Label>
            <DropdownButton
              id="dropdown-resolution"
              title={resolution}
              onSelect={handleSelectedResolution}
            >
                <Dropdown.Item eventKey="Done">Done</Dropdown.Item>
                <Dropdown.Item eventKey="Resolved">Resolved</Dropdown.Item>
                <Dropdown.Item eventKey="Unresolved">Unresolved</Dropdown.Item>
                <Dropdown.Item eventKey="Cannot Reproduce">
                  Cannot Reproduce
                </Dropdown.Item>
                <Dropdown.Item eventKey="Incomplete">Incomplete</Dropdown.Item>
                <Dropdown.Item eventKey="Duplicate">Duplicate</Dropdown.Item>
              </DropdownButton>
              </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Solution</Form.Label>
            <Form.Control
              as="textarea"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>How to Test</Form.Label>
            <Form.Control
              as="textarea"
              value={testing}
              onChange={(e) => setTesting(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSave(resolution, solution, testing)}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoreDetailsModal;
