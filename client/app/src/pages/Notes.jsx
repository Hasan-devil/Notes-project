import { Card, Container, Row, Col, Modal } from "react-bootstrap";
import "../notes.css";
import { useState, useEffect, useRef } from "react";
export default function Notes(props) {
  //states
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");
  const isAdd = useRef(false);
  const [showModal, setShow] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/notes")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((json) => setData(json))

      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // functions
  const handleClose = () => {
    setNoteText("");
    setNoteTitle("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleTitleChange = (e) => setNoteTitle(e.target.value);
  const handleTextChange = (e) => setNoteText(e.target.value);

  // function edi_Note(id, title, text) {
  //   const newData = [...data];
  //   newData[id] = { title, text };
  //   setData(newData);Title
  // }
  function editNote(id, Title, text) {
    fetch(`http://127.0.0.1:5000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: Title, description: text }),
    })
      .then((res) => res.json())
      .then((updatednote) => {
        setData((prev) =>
          prev.map((note) =>
            note.id === updatednote.id
              ? {
                  ...note,
                  title: updatednote.title,
                  description: updatednote.description,
                }
              : note
          )
        );
      });
  }

  function addNote(title, text) {
    fetch("http://127.0.0.1:5000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, description: text }),
    })
      .then((res) => res.json())
      .then((json) => setData((prev) => [...prev, json]));
  }
  function deleteNotes(id) {
    fetch(`http://127.0.0.1:5000/notes/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setData((prev) => prev.filter((item) => item.id !== id));
      }
    });
  }
  //main return
  return (
    <note>
      {/* for adding notes */}
      <NotesEditor
        theme={props.theme}
        isAdd={(isAdd.current = true)}
        showModal={showModal}
        noteTitle={noteTitle}
        noteText={noteText}
        handleClose={handleClose}
        handleTitleChange={handleTitleChange}
        handleTextChange={handleTextChange}
        handleAdd={addNote}
      />
      <button className="btn-field" onClick={handleShow}>
        Enter Your Notes Here
        <span className="btn-ico">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </span>
      </button>
      <notesholder>
        <Container>
          <Row>
            {data.map((_, i) => (
              <Col key={i} xs={12} md={6} lg={4}>
                <NoteCard
                  key={i}
                  index={i}
                  id={_.id}
                  title={_.title}
                  text={_.description}
                  handleEdit={editNote}
                  handleDelete={deleteNotes}
                  isAdd={(isAdd.current = false)}
                  theme={props.theme}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </notesholder>
    </note>
  );
}
// notes editor
function NotesEditor(props) {
  // states
  const [noteTitle, setNoteTitle] = useState(props.noteTitle);
  const [noteText, setNoteText] = useState(props.noteText);
  // functions
  useEffect(() => {
    setNoteTitle(props.noteTitle);
    setNoteText(props.noteText);
  }, [props.noteTitle, props.noteText]);
  const addNote = (e) => {
    e.preventDefault();
    props.handleAdd(noteTitle, noteText);
    props.handleClose();
    setNoteTitle("");
    setNoteText("");
  };

  return (
    <>
      <Modal
        show={props.showModal}
        onHide={props.handleClose}
        centered
        backdrop="static"
        className="notes-modal"
      >
        <Modal.Header closeButton className={props.theme=="body-dark"?"bg-dark text-white":"bg-light"}>
          <Modal.Title>{props.isAdd ? "Add Notes" : "Edit Notes"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={props.theme=="body-dark"?"bg-dark":"bg-light"}>
          <form
            autoComplete="off"
            onSubmit={props.isAdd ? addNote : props.handleEdit}
          >
            <div className="mb-3 form-field">
              <input
                type="text"
                className="form-control title-input"
                id="noteTitle"
                placeholder="Title"
                value={noteTitle}
                onChange={props.handleTitleChange}
                autoFocus
              />
              <textarea
                className="form-control content-input"
                id="noteContent"
                rows="5"
                value={noteText}
                onChange={props.handleTextChange}
                required
              ></textarea>
            </div>
            <button className="btn btn-save m-1" type="submit">
              Save Note
            </button>
            <button
              className="btn btn-dark"
              onClick={props.isAdd ? props.handleClose : props.handleDelete}
            >
              {props.isAdd ? "Cancel" : "Delete"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

//each note card component
function NoteCard(props) {
  //states
  const [noteTitle, setNoteTitle] = useState(props.title || "Title");
  const [noteText, setNoteText] = useState(props.text);
  const [showModal, setShow] = useState(false);
  // functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTitleChange = (e) => setNoteTitle(e.target.value);
  const handleTextChange = (e) => setNoteText(e.target.value);
  const editNote = (e) => {
    e.preventDefault();
    props.handleEdit(props.id, noteTitle, noteText);
    handleClose();
  };
  const deleteNote = (e) => {
    e.preventDefault();
    props.handleDelete(props.id);
    handleClose();
  };
  useEffect(() => {
    setNoteTitle(props.title || "Title");
    setNoteText(props.text);
  }, [props.title, props.text]);

  return (
    <>
      <NotesEditor
        handleClose={handleClose}
        showModal={showModal}
        noteTitle={noteTitle}
        handleTitleChange={handleTitleChange}
        noteText={noteText}
        handleTextChange={handleTextChange}
        handleEdit={editNote}
        handleDelete={deleteNote}
        index={props.index}
        isAdd={props.isAdd}
        theme={props.theme}
      />
      <Card className="note-card shadow-sm" onClick={handleShow}>
        <Card.Body>
          <Card.Title>{props.title || "Title"}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
