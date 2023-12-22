import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [bugs, setBugs] = useState([]);

    const addBug = (newBug) => {
        const bugWithStatusAndId = { ...newBug, status: "TO DO", id: uuidv4() };
        setBugs(currentBugs => [...currentBugs, bugWithStatusAndId]);
    };

    return (
        <UserContext.Provider value={{ bugs, addBug }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => React.useContext(UserContext);
