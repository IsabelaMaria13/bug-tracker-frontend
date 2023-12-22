import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import "./Toolbar.css";
import { useUserContext } from "./UserContext";

const Toolbar = ({ email }) => {
  const {projects} = useUserContext();

  return (
    <div className="toolbar">
      <span className="logo">BugMaster</span>
      <DropdownButton id="dropdown-projects" title="CHOOSE PROJECT">
        {projects.map((project, index) => (
          <Dropdown.Item key={index} className="dropdownOptions">
            {project}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Button variant="outline-primary" className="add-bug-btn">
        Add Bug
      </Button>
      <span className="user-info">
        {email}
        <div className="user-icon">👤</div> {}
      </span>
    </div>
  );
};

export default Toolbar;
