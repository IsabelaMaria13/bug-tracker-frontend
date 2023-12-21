import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from 'react-bootstrap';
import "./Dashboard.css";

const Dashboard = ({headerTitle, bugs = []}) => {
    return (
        <Card className='mb-3 h-100 dashboardCard'>
            <Card.Header>{headerTitle}</Card.Header>
            <Card.Body>
                {bugs.map((bug, index) =>{
                    <Card key={index} className='mb-2 floating-card'>
                        <Card.Body>
                            <Card.Title>{bug.name}</Card.Title>
                            <Card.Text>Priority: {bug.priority}</Card.Text>
                        </Card.Body>
                    </Card>
                })}

            </Card.Body>
        </Card>
    );
};

export default Dashboard;