import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [bugs, setBugs] = useState([]);

    const addBug = (newBug) => {
        const bugWithStatus = { ...newBug, status: "TO DO" }; // Adaugă statusul "TO DO"
        setBugs(currentBugs => [...currentBugs, bugWithStatus]);
    };

    return (
        <UserContext.Provider value={{ bugs, addBug }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => React.useContext(UserContext);
