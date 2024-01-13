import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [bugs, setBugs] = useState([]);

    const addBug = async (newBug) => {
      try {
        const response = await fetch('/api/bugs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
        <UserContext.Provider value={{ bugs, addBug, updateBug, updateBugStatus }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => React.useContext(UserContext);
