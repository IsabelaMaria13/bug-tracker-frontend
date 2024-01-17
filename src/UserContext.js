import React, { createContext, useState } from "react";
const UserContext = createContext();

const API_URL = "http://localhost:3001/api";

export const UserProvider = ({ children }) => {
  const [bugs, setBugs] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [rerenderToolbar, setRerenderToolbar] = useState(0);
  const [rerenderBugs, setRerenderBugs] = useState(0);

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

  const updateBug = async (bugId, updatedDetails) => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`${API_URL}/bugs/${bugId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update bug!');
      }
  
      const updatedBug = await response.json();
  
      setBugs((currentBugs) =>
        currentBugs.map((bug) =>
          bug.id === bugId ? { ...bug, ...updatedBug } : bug
        )
      );
  
      console.log('Bug updated successfully:', updatedBug);
    } catch (error) {
      console.error('Error updating bug:', error);
    }
  };

  const updateBugStatus = (bugId, newStatus) => {
    setBugs((bugs) => {
      return bugs.map((bug) => {
        if (bug.id === bugId) {
          return { ...bug, status: newStatus };
        }
        return bug;
      });
    });
  };

  const fetchBugsForProject = async (projectId) => {
    setBugs([]);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/bugs/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        if (response.status === 403) {
        } else {
          throw new Error("Failed to fetch bugs for project");
        }
      }
  
      const bugsForProject = await response.json();
      setBugs([...bugsForProject])
    } catch (error) {
      console.error("Error fetching bugs for project:", error);
      setBugs([]);
    }
  };

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to get all users!");
      }

      const data = await response.json();
      const users = data;
      setUsers(users);
    } catch (error) {
      console.error("Error getting all users:", error);
    }
  };
  
  return (
    <UserContext.Provider value={{setBugs, bugs ,fetchBugsForProject,  addBug, updateBug, 
                              updateBugStatus, selectedProjectId, setSelectedProjectId, projects,   
                              updateProjects, getUsers, users, rerenderToolbar, setRerenderToolbar, 
                              setRerenderBugs, rerenderBugs }}>
      {children}

    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
