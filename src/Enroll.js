import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { useUserContext } from "./UserContext";

const API_URL = "http://localhost:3001/api";

const Enroll = ({ userProfile })=> {
  const { selectedProjectId, fetchBugsForProject } = useUserContext();
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (!selectedProjectId || !userProfile || !userProfile.projects) {
        return;
      }

      const projectIds = userProfile.projects.map((project) => project.id);
      const isUserEnrolled = projectIds.includes(selectedProjectId);

      setIsEnrolled(isUserEnrolled);
    };

    checkEnrollmentStatus();
  }, [selectedProjectId, userProfile]);

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
    <Button
      variant="outline-primary"
      className="add-bug-btn"
      onClick={handleEnroll}
      disabled={isEnrolled || !selectedProjectId}
    >
      {isEnrolled ? 'Enrolled' : 'Enroll'}
    </Button>
  );
};

export default Enroll;
