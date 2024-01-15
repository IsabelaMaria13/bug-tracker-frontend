import React, { createContext, useState } from "react";
import {Modal, Button} from "react-bootstrap"

const UserContext = createContext();

const API_URL = "http://localhost:3001/api";

export const UserProvider = ({ children }) => {
  const [bugs, setBugs] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projects, setProjects] = useState([]);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  // const handleLogout = () => {
  //   logoutUser();
  //   navigate("/");
  //   handleCloseLogoutModal();
  // };

  const updateProjects = (newProjects) => {
    setProjects(newProjects);
  };

  const addBug = async (newBug) => {
    const token = localStorage.getItem("token");
    if (!selectedProjectId) {
      console.error("No selected project ID when attempting to add a bug");
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/bugs/${selectedProjectId}`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBug),
      });
  
      if (!response.ok) {
        console.error("Response status:", response.status);
        throw new Error("Failed to create bug");
      }
  
      const addedBug = await response.json();
      setBugs((currentBugs) => [...currentBugs, addedBug]);
    } catch (error) {
      console.error("Error during addBug:", error);
    }
  };

  const updateBug = (bugId, updatedDetails) => {
    setBugs((currentBugs) =>
      currentBugs.map((bug) =>
        bug.id === bugId ? { ...bug, ...updatedDetails } : bug
      )
    );
  };

  const updateBugStatus = (bugId, newStatus) => {
    setBugs((currentBugs) => {
      return currentBugs.map((bug) => {
        if (bug.id === bugId) {
          return { ...bug, status: newStatus };
        }
        return bug;
      });
    });
  };

  const assignBug = (bugId, newStatus) => {
    setBugs((currentBugs) => {
      
    })
  }

  const fetchBugsForProject = async (projectId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/bugs/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 403) {
          // Show the modal here
          handleShowLogoutModal();
        } else {
          throw new Error("Failed to fetch bugs for project");
        }
      }
  
      const bugsForProject = await response.json();
      setBugs([... bugsForProject])
    } catch (error) {
      console.error("Error fetching bugs for project:", error);
      setBugs([]);
    }
  };
  
  return (
    <UserContext.Provider value={{ bugs ,fetchBugsForProject,  addBug, updateBug, updateBugStatus, selectedProjectId, setSelectedProjectId, projects, updateProjects }}>
      {children}
      <Modal show={showLogoutModal} onHide={handleCloseLogoutModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>In order to see bugs and details about this project, you have to enroll.
          To enroll, please click on the "Enroll" button in the right part of the toolbar. Otherwise, you can select another project from the dropwdown.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseLogoutModal}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal>
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
