import { Card, Container, Row, Col, Modal } from "react-bootstrap";
import "../notes.css";
import { useState, useRef } from "react";

export default function Notes() {
  //states
  const [showModal, setShow] = useState(false);
  const isEdit = useRef(false);
  //state handling functions
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    isEdit.current = false;
  };
  const handleShowEdit = () => {
    setShow(true);
    isEdit.current = true;
    console.log("Edit Notes clicked");
  };

//notes editor component
  function NotesEditor(props) {
    return (
      <>
        <Modal show={showModal} onHide={handleClose} centered backdrop="static" className="notes-modal">
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form autoComplete="off">
              <div className="mb-3 form-field">
                <input
                  type="text"
                  className="form-control title-input"
                  id="noteTitle"
                  placeholder="Title"
                  autoFocus
                />
                <textarea
                  className="form-control content-input"
                  id="noteContent"
                  rows="5"
                placeholder="Enter your note content here"
                  required
                ></textarea>
              </div>
              <button className="btn btn-primarym m-1">Save Note</button>
              <button className="btn btn-dark">{props.btn}</button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  //main return
  return (
    <note>
      {isEdit.current ? (
        <NotesEditor title="Edit Note" btn="Delete Notes"/>
      ) : (
        <NotesEditor title="Add New Note" btn="Cancel"/>
      )}

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
            {Array(20)
              .fill()
              .map((_, i) => (
                <Col key={i} xs={12} md={6} lg={4}>
                  <NoteCard
                    onClick={handleShowEdit}
                    title="Note Title"
                    text="This is a sample note content. You can edit or delete this note. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Sed natus,
          consectetur distinctio exercitationem non quod eaque nobis voluptatum
          architecto optio nihil voluptate minima veritatis rem, atque quia,
          provident quos excepturi."
                  />
                </Col>
              ))}
          </Row>
        </Container>
      </notesholder>
    </note>
  );
}
//each note card component
function NoteCard(props) {
  return (
    <Card className="note-card" onClick={props.onClick} border="black">
      <Card.Body>
        <Card.Title>{props.title || "Title"}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
