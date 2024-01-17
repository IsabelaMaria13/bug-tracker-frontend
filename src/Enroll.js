import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useUserContext } from "./UserContext";

const API_URL = "http://localhost:3001/api";

const Enroll = ({ userProfile }) => {
  const { selectedProjectId, fetchBugsForProject, setBugs } = useUserContext();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const handleShowEnrollModal = () => setShowEnrollModal(true);
  const handleCloseEnrollModal = () => setShowEnrollModal(false);

  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (!selectedProjectId || !userProfile || !userProfile.projects) {
        return;
      }
      const projectIds = userProfile.projects.map((project) => project.id);
      const isUserEnrolled = projectIds.includes(selectedProjectId);

      setIsEnrolled(isUserEnrolled);

      if (isUserEnrolled) {
        // Only fetch bugs if the user is enrolled in the selected project
        fetchBugsForProject(selectedProjectId);
      } else {
        // If the user is not enrolled, clear bugs and show enrollment warning
        setBugs([]);
        handleShowEnrollModal();
      }
    };

    checkEnrollmentStatus();
  }, [selectedProjectId]);

  const handleEnroll = async () => {
    if (!selectedProjectId) {
      alert("Please select a project first.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/projects/enroll/${selectedProjectId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to enroll in project");
      }

      setIsEnrolled(true);
      alert("Successfully enrolled in project!");

      fetchBugsForProject(selectedProjectId);

    } catch (error) {
      console.error("Error enrolling in project:", error);
      alert("Error enrolling in project.");
    }
  };

  return (
    <><Button
      variant="outline-primary"
      className="add-bug-btn"
      onClick={handleEnroll}
      disabled={isEnrolled || !selectedProjectId}
    >
      {isEnrolled ? 'Enrolled' : 'Enroll'}
    </Button>
    <Modal show={showEnrollModal} onHide={handleCloseEnrollModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>In order to see bugs and details about this project, you have to enroll.
          To enroll, please click on the "Enroll" button in the right part of the toolbar.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseEnrollModal}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal></>
  );
};

export default Enroll;