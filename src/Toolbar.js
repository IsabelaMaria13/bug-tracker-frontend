import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import './Toolbar.css';


const Toolbar = ({ email }) => {
    return (
      <div className="toolbar">
        <span className="logo">BugMaster</span>
        <DropdownButton id="dropdown-projects" title="CHOOSE PROJECT">
          {}
          <Dropdown.Item href="#/action-1" className="dropdownOptions">Project 1</Dropdown.Item>
          <Dropdown.Item href="#/action-2" className="dropdownOptions">Project 2</Dropdown.Item>
          {}
        </DropdownButton>
        <Button variant="outline-bg-secondary" type="button" className="add-bug-btn">ADD BUG</Button>
        <span className="user-info">
          {email}
          <div className="user-icon">👤</div> {}
        </span>
      </div>
    );
  };
  
  export default Toolbar;