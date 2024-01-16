import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Modal,
  Dropdown,
  DropdownButton,
  Form,
  Button,
} from "react-bootstrap";
import "./Dashboard.css";
import { useUserContext } from "./UserContext";
import { getProfilUser } from "./auth.service";

const API_URL = "http://localhost:3001/api";

const Dashboard = ({ headerTitle, nextStatus }) => {
  const [showModal, setShowModal] = useState(false);
  const { triggerUpdate, updateBug, updateBugStatus, selectedProjectId, bugs, getUsers, users, fetchBugsForProject } = useUserContext();
  const [priority, setPriority] = useState("Priority");
  const [bugTitle, setBugTitle] = useState("");
  const [reporter, setReporter] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [link, setLink] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [testing, setTesting] = useState("");
  const [solution, setSolution] = useState("");
  const [resolution, setResolution] = useState("Resolution");
  const [gitCommitLink, setGitCommitLink] = useState("");
  const [bugIdToUpdate, setBugIdToUpdate] = useState(null);
  const [bugsShownModal, setBugsShownModal] = useState(new Set());

  const memoizedGetUsers = useCallback(() => {
    getUsers().catch((error) => {
      console.error("Error getting users:", error);
    });
  }, [getUsers]);

  useEffect(() => {
    if (bugIdToUpdate !== null) {
      const bugToUpdate = bugs.find((bug) => bug.id === bugIdToUpdate);


      if (bugToUpdate) {
        setBugTitle(bugToUpdate.title);
        setPriority(bugToUpdate.priority);
        setAssignTo(bugToUpdate.assignTo);
        setLink(bugToUpdate.link);
        setTesting(bugToUpdate.testing || "");
        setSolution(bugToUpdate.solution || "");
        setResolution(bugToUpdate.resolution);
        setGitCommitLink(bugToUpdate.gitCommitLink || "");
        setAdditionalInfo(bugToUpdate.additionalInfo || "");

        const reporterUser = users.find((user) => user.id === bugToUpdate.reporterId);
        if (reporterUser) {
          setReporter(reporterUser.email);
        } else {
          memoizedGetUsers();
        }

      }
    }
  }, [bugIdToUpdate, bugs, selectedProjectId, users, memoizedGetUsers]);

  const assignToMe = async (e, bugId) => {
    e.stopPropagation();  // Stop event propagation to parent div
    try {
      const token = localStorage.getItem("token");
      const userProfile = await getProfilUser(token);

      console.log(userProfile.id);
      console.log(bugId)

      if (userProfile && userProfile.id && bugId) {
        updateBug(bugId, {
          assignedToId: userProfile.id,
          status: "InProgress",
        });
        triggerUpdate();
      }




    } catch (error) {
      console.error("Error assigning bug to me:", error);
    }
  };

  const handleShowModal = (bugId) => {
    setBugIdToUpdate(bugId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBugsShownModal((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(bugIdToUpdate);
      return newSet;
    });
    setBugIdToUpdate(null);
  };

  const handleSelectedPriority = (eventKey) => setPriority(eventKey);
  const handleSelectedResolution = (eventKey) => setResolution(eventKey);

  const handleUpdateBug = (e) => {
    e.preventDefault();
    if (bugIdToUpdate !== null) {
      updateBug(bugIdToUpdate, {
        title: bugTitle,
        priority: priority,
        reporter: reporter,
        assignTo: assignTo,
        link: link,
        testing: testing,
        solution: solution,
        resolution: resolution,
        gitCommitLink: gitCommitLink,
        additionalInfo: additionalInfo,
      });
    }
    setShowModal(false);
    setBugTitle("");
    setReporter("");
    setAssignTo("");
    setLink("");
    setTesting("");
    setSolution("");
    setGitCommitLink("");
    setAdditionalInfo("");
  };


  const moveBugToNextStatus = (bug) => {
    const mappedNextStatus = statusMap[nextStatus];

    if (bug.bugStatus === statusMap['InProgress'] && mappedNextStatus === 'Verification') {
      if (!bugsShownModal.has(bug.id)) {
        setBugsShownModal((prevSet) => new Set(prevSet).add(bug.id));
        handleShowModal(bug.id);
      }
    } else {
      updateBugStatus(bug.id, mappedNextStatus);
    }
  };

  const statusMap = {
    "To Do": "ToDo",
    "In Progress": "InProgress",
    "Verification": "Verification",
    "Verification Done": "VerificationDone",
    "Done": "Done",
    "Closed": "ClosedIssue",
  };

  return (
    <Card className="mb-3 h-100 dashboardCard">
      <Card.Header>{headerTitle}</Card.Header>
      <Card.Body>
        {bugs
          .filter((bug) => bug.bugStatus === statusMap[headerTitle]).map((bug, index) => (
            <div
              key={index}
              className="bug-item"
              onClick={() => handleShowModal(bug.id)}
            >
              <Card
                key={index}
                className="mb-2 floating-card"
                style={{ cursor: "pointer" }}
              >
                <Card.Body>
                  <Card.Title>{bug.title}</Card.Title>
                  <Card.Text>Priority: {bug.priority}</Card.Text>
                  {(bug.bugStatus === "Verification" ||
                    bug.bugStatus === "VerificationDone" ||
                    bug.bugStatus === "Done") && (
                      <Card.Text>
                        Resolution: {bug.resolution || "Not Set"}
                      </Card.Text>
                    )
                  }
                  {headerTitle !== "To Do" && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (bug.bugStatus !== statusMap[nextStatus]) {
                          moveBugToNextStatus(bug);
                        }
                      }}
                      className="btn-smaller-refined"
                    >
                      Move to {nextStatus}
                    </Button>
                  )}
                  {headerTitle === "To Do" && (
                    <Button
                      id="assign-button"
                      className="btn-smaller-refined"
                      onClick={(e) => assignToMe(e, bug.id)}
                    >
                      Assign to me
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
      </Card.Body>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="modal-background"
      >
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
                title={priority}
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
                readOnly
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
              <Form.Label>Additional Information</Form.Label>
              <Form.Control
                as="textarea"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                maxLength={500}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Resolution:</Form.Label>
              <DropdownButton
                id="dropdown-priority"
                title={resolution}
                onSelect={handleSelectedResolution}
                className="w-100"
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
              <Form.Label>Solution:</Form.Label>
              <Form.Control
                as="textarea"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                maxLength={500}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>How to test:</Form.Label>
              <Form.Control
                as="textarea"
                value={testing}
                onChange={(e) => setTesting(e.target.value)}
                maxLength={500}
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
