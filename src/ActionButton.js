import React from 'react';
import { Button } from 'react-bootstrap';

const ActionButton = ({ onActionClick }) => {
  return (
    <Button className="action-button" variant="success" size="sm" onClick={onActionClick}>
      →
    </Button>
  );
};

export default ActionButton;
