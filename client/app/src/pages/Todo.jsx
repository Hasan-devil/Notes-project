import { Card, Button, Modal } from "react-bootstrap";
import "../todo.css";
import { useState } from "react";

export default function Todo() {
  return (
    <div className="todo-container">
      <div className="todo-form-outline">
        <form>
          <input type="text" className="todo-input" placeholder="Add a task" />
          <Button variant="add" type="submit">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-plus-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </Button>
        </form>
      </div>
      {/* List of tasks */}
      <div className="todo-list-container">
        {Array(10)
          .fill()
          .map((_, index) => (
            <List
              key={index}
              description={`Description for task ${index + 1}`}
              index={index + 1}
            />
          ))}
      </div>
    </div>
  );
}
function List(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true)
    let value = e.target.innerText;
    console.log(value);
    return value;
  };
  return (
    <>
      <EditListModal show={show} handleClose={handleClose} value={handleShow}/>
      <Card className="todo-card" border="dark">
        <Card.Body className="card-Text" onClick={handleShow}>
            <Card.Text  className="todo-text">
              {props.index}. {props.description}
            </Card.Text>
          <Button variant="danger" className="btn-delete btn-close" onClick={e=>{
            e.stopPropagation();
            alert("Delete Task");
          }}></Button>
        </Card.Body>
      </Card>
    </>
  );
}
function EditListModal(props) {
  const [taskValue] = useState(props.handleShow);
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      className="todo-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form autoComplete="off" className="todo-form">
          <input type="text" className="todo-input" value={taskValue}/><br />
          <Button variant="primary" className="m-1">
            Save Task
          </Button>
          <Button variant="dark">Delete Task</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
