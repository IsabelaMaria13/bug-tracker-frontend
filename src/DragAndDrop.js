import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';

const DragAndDrop = ({ bugs, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="unique-droppable-id">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {bugs.map((bug, index) => (
              <Draggable key={`draggable-${bug.id}`} draggableId={`draggable-${bug.id}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ marginBottom: "8px" }}
                  >
                    <Card className="mb-2 floating-card" style={{ cursor: "pointer" }}>
                      <Card.Body>
                        <Card.Title>{bug.title}</Card.Title>
                        <Card.Text>Priority: {bug.priority}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDrop;
