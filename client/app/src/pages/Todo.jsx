import { Card, Button, Modal } from "react-bootstrap";
import "../todo.css";
import { useState,useEffect } from "react";

export default function Todo() {
  const [data, setData] = useState(["Sample Task", "Another Task"]);
  const [inputValue,setInputValue] = useState("")
  function addTask(e) {
    e.preventDefault();
    setData([...data, inputValue.trim()]);
    setInputValue("")
  }
  function editTask(index,task) {
    const newData = [...data]
    newData[index] = task
    setData(newData)
  }
  function removeTask(index){
    const newData=[...data]
    newData.splice(index,1)
    setData(newData)
  }
  //main return
  return (
    <div className="todo-container">
      <div className="todo-form-outline">
        <form autoComplete="off" onSubmit={addTask}>
          <input
            type="text"
            className="todo-input"
            placeholder="Add a task"
            value={inputValue}
            onChange={e=>setInputValue(e.target.value)}
            required
          />
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
        {data.map((_, index) => (
          <List
            key={index}
            description={_}
            index={index + 1}
            number={index}
            handleEdit={editTask}
            handleRemove={removeTask}
          />
        ))}
      </div>
    </div>
  );
}
function List(props) {
  const [show, setShow] = useState(false);
  const [taskValue, setTaskValue] = useState(props.description);
  
  useEffect(() => {
    setTaskValue(props.description)
  }, [props.description])
  

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const editTask = (e) =>{
    e.preventDefault();
    props.handleEdit(props.number,taskValue)
    setShow(false)
  }
  const removeTask = () =>{
    props.handleRemove(props.number)
    setShow(false)
  }

  const handleChange = (e) => setTaskValue(e.target.value);
  return (
    <>
      <EditListModal
        show={show}
        handleClose={handleClose}
        taskValue={taskValue}
        setTaskValue={setTaskValue}
        onChangeHandler={handleChange}
        handleEdit={editTask}
        handleRemove={removeTask}
      />
      <Card className="todo-card">
        <Card.Body className="card-Text" onClick={handleShow}>
          <Card.Text className="todo-text">
            {props.index}. {props.description}
          </Card.Text>
          <Button
            variant="danger"
            className="btn-delete btn-close"
            onClick={(e) => {
              e.stopPropagation();
              removeTask()
            }}
          ></Button>
        </Card.Body>
      </Card>
    </>
  );
}
function EditListModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      centered
      className="todo-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          autoComplete="off"
          className="todo-form"
          onSubmit={props.handleEdit}
        >
          <input
            type="text"
            className="todo-input"
            value={props.taskValue}
            onChange={props.onChangeHandler}
          />
          <br />
          <Button variant="light" className="m-1 btn-primarym" type="submit">
            Save task
          </Button>
          <Button variant="dark" onClick={props.handleRemove}>Delete task</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
