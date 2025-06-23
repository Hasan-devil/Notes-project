import { Card, Container, Row, Col, Modal } from "react-bootstrap";
import "../notes.css";
import { useState } from "react";

export default function Notes() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function NotesEditor() {
    return (
      <>
        <Modal show={show} onHide={handleClose} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Edit Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="noteTitle" className="form-label">
                  Note Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noteTitle"
                  placeholder="Enter note title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="noteContent" className="form-label">
                  Note Content
                </label>
                <textarea
                  className="form-control"
                  id="noteContent"
                  rows="5"
                  placeholder="Enter note content"
                ></textarea>
              </div>
              <button className="btn btn-primary">
                Save Note
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  return (
    <note>
      <NotesEditor />
      <button className="btn-field" onClick={handleShow}>
        Enter Your Notes Here
        <button className="btn-ico">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-plus-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </button>
      </button>
      <notesholder>
        <Container>
          <Row>
            {Array(10)
              .fill()
              .map((_, i) => (
                <Col key={i} xs={12} md={6} lg={4}>
                  <NoteCard
                    onClick={handleShow}
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
function NoteCard(props) {
  console.log("Notecard");

  return (
    <Card className="note-card" onClick={props.onClick}>
      <Card.Body>
        <Card.Title>{props.title || "Title"}</Card.Title>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
