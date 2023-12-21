import React, {createContext, useState, useContext} from 'react';

// folosim ca sa transmitem informatii in aplicatie la mai multe componente

const UserContext = createContext(null);
export const useUserContext = () => useContext(UserContext);
export const UserProvider = ({children}) => {
    const [projects, setProjects] = useState(['']);

    const addProject = projectName => {
        setProjects(projects => [...projects, projectName]);
    };

    return (
        <UserContext.Provider value={{projects, addProject}}>
            {children}
        </UserContext.Provider>

    );
};