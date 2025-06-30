import "./App.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Notes from "./pages/Notes";
import Todo from "./pages/Todo";
import Script from "./pages/Script";
function NavBarElement() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container fluid="xxl">
          <Navbar.Brand as={NavLink} to={"/"}>
            <img
              src="/favicon.png"
              alt="Notes Logo"
              width={32}
              height={32}
            />{" "}
            Notes App
          </Navbar.Brand>
          {/*Togglebutton|
                        v  */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="w-100 justify-content-between mx-6">
              <Nav.Link className="nav-links shadow" as={NavLink} to={"/"}>
                Notes
              </Nav.Link>
              <Nav.Link className="nav-links shadow" as={NavLink} to={"/todo"}>
                To-Do
              </Nav.Link>
              <Nav.Link className="nav-links shadow" as={NavLink} to={"/script"}>
                Script
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/script" element={<Script />} />
      </Routes>
    </Router>
  );
}
function App() {
  return (
    <>
      <NavBarElement />
    </>
  );
}
export default App;
