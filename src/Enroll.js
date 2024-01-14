import React from 'react';
import { Button } from 'react-bootstrap';
import { useUserContext } from "./UserContext";

const API_URL = "http://localhost:3001/api";

const Enroll = ( )=> {
  const { selectedProjectId } = useUserContext();

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

      alert("Successfully enrolled in project!"); 
    } catch (error) {
      console.error("Error enrolling in project:", error);
      alert("Error enrolling in project."); 
    }
  };

  return (
    <Button
      variant="outline-success"
      className="enroll-btn"
      onClick={handleEnroll}
      disabled={!selectedProjectId}
    >
      Enroll
    </Button>
  );
};

export default Enroll;
