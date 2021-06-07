import { Navbar, Nav, Button } from "react-bootstrap";

export default function MyNavbar({ displayForm, sortStudentsList }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="text-muted"><span className="font display-4">Wawa Academy</span></Navbar.Brand>
      <Nav>
        <Nav.Link >
          <Button variant="outline-light" size="sm" onClick={displayForm}>
            Add New Student
          </Button>
        </Nav.Link>
        <Nav.Link>
          <Button variant="outline-light" size="sm" onClick={sortStudentsList}>
            Sort By Name
          </Button>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
