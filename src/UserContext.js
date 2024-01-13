import React, { createContext, useState } from 'react';

const UserContext = createContext();

const API_URL = 'http://localhost:3001/api';

export const UserProvider = ({ children }) => {
    const [bugs, setBugs] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const addBug = async (newBug) => {
      const token = localStorage.getItem('token');
      const projectId = newBug.project; 
      try {
        const response = await fetch(`${API_URL}/bugs/${projectId}`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newBug),
        });
        if (!response.ok) {
          throw new Error('Failed to create bug');
        }
        const addedBug = await response.json();
    
        setBugs(currentBugs => [...currentBugs, addedBug]);
      } catch (error) {
        console.error('Error during addBug:', error);
      }
    };


    const updateBug = (bugId, updatedDetails) => {
        setBugs(currentBugs =>
            currentBugs.map(bug =>
                bug.id === bugId ? {...bug, ...updatedDetails}:bug
            )
        );
    }
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

    return (
        <UserContext.Provider value={{ bugs, addBug, updateBug, updateBugStatus, selectedProjectId, setSelectedProjectId, selectedProject, setSelectedProject }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => React.useContext(UserContext);
