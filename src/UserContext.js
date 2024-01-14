import React, { createContext, useState } from "react";

const UserContext = createContext();

const API_URL = "http://localhost:3001/api";

export const UserProvider = ({ children }) => {
  const [bugs, setBugs] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

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

  const fetchBugsForProject = async (projectId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/bugs/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch bugs for project");
      }
      const bugsForProject = await response.json();
      setBugs([...bugsForProject]);
    } catch (error) {
      console.error("Error fetching bugs for project:", error);
    }
  };
  
  return (
    <UserContext.Provider value={{ bugs ,fetchBugsForProject,  addBug, updateBug, updateBugStatus, selectedProjectId, setSelectedProjectId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
