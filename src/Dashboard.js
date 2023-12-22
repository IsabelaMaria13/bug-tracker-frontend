import React, { useState, useEffect } from 'react';
import { Card, Modal, Dropdown, DropdownButton, Form, Button, ModalFooter } from 'react-bootstrap';
import "./Dashboard.css";
import { useUserContext } from './UserContext';

const Dashboard = ({ headerTitle, bugs = [] }) => {

    const [showModal, setShowModal] = useState(false);
    const {updateBug} = useUserContext();
    const [selectedItem, setSelectedItem] = useState("Priority");
    const [bugTitle, setBugTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [reporter, setReporter] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [link, setLink] = useState("");
    const [mentions, setMentions] = useState("");
    const [gitCommitLink, setGitCommitLink] = useState("");
    const [bugIdToUpdate, setBugIdToUpdate] = useState(null);

    useEffect(() => {
        if (bugIdToUpdate !== null) {
            // Găsește bug-ul cu id-ul specificat
            const bugToUpdate = bugs.find(bug => bug.id === bugIdToUpdate);

            // Actualizează starea locală cu valorile bug-ului
            if (bugToUpdate) {
                setBugTitle(bugToUpdate.title);
                setSelectedItem(bugToUpdate.priority);
                setReporter(bugToUpdate.reporter);
                setAssignTo(bugToUpdate.assignTo);
                setLink(bugToUpdate.link);
                setMentions(bugToUpdate.mentions || "");
                setGitCommitLink(bugToUpdate.gitCommitLink || "");
            }
        }
    }, [bugIdToUpdate, bugs]);

    const handleShowModal = (bugId) => {
        setBugIdToUpdate(bugId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setBugIdToUpdate(null); // Resetează id-ul bug-ului când se închide modalul
    };

    const handleSelectedPriority = (eventKey) => setSelectedItem(eventKey);

    const handleUpdateBug = (e) => {
        e.preventDefault();
        if (bugIdToUpdate !== null) {
            // Actualizează bug-ul folosind funcția din context
            updateBug(bugIdToUpdate, {
                title: bugTitle,
                priority: selectedItem,
                reporter: reporter,
                assignTo: assignTo,
                link: link,
                mentions: mentions,
                gitCommitLink: gitCommitLink,
            });
        }
        setShowModal(false);
        // Resetează valorile la închiderea modalului
        setBugTitle("");
        setReporter("");
        setAssignTo("");
        setLink("");
        setMentions("");
        setGitCommitLink("");
    };

    return (
        <Card className='mb-3 h-100 dashboardCard'>
            <Card.Header>{headerTitle}</Card.Header>
            <Card.Body>
                {bugs.map((bug, index) => (
                    <div key={index} className='bug-item' onClick={() => handleShowModal(bug.id)}>
                        <Card key={index} className='mb-2 floating-card' style={{ cursor: 'pointer' }}>
                            <Card.Body>
                                <Card.Title>{bug.title}</Card.Title>
                                <Card.Text>Priority: {bug.priority}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </Card.Body>
            <Modal show={showModal} onHide={handleCloseModal} className="modal-background">
                <Modal.Header closeButton>
                    <Modal.Title className="model-title">Bug Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={bugTitle}
                                onChange={(e) => setBugTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Priority</Form.Label>
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
                            <Form.Label>Reporter</Form.Label>
                            <Form.Control
                                type="text"
                                value={reporter}
                                onChange={(e) => setReporter(e.target.value)}
                                required
                                className="w-100"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Assign To</Form.Label>
                            <Form.Control
                                type="text"
                                value={assignTo}
                                onChange={(e) => setAssignTo(e.target.value)}
                                required
                                className="w-100"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Link Github</Form.Label>
                            <Form.Control
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mentions</Form.Label>
                            <Form.Control
                                type="text"
                                value={mentions}
                                onChange={(e) => setMentions(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Git Commit Link</Form.Label>
                            <Form.Control
                                type="text"
                                value={gitCommitLink}
                                onChange={(e) => setGitCommitLink(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                   <Button variant="primary" onClick={handleUpdateBug}>
                        Update Bug
                   </Button>
                </Modal.Footer>
            </Modal>
        </Card>
        
    );
};

export default Dashboard;
