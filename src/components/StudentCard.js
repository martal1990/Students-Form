import { Card, Col, Row, ListGroup } from "react-bootstrap";
import femaleImage from "../images/female.jpg";
import maleImage from "../images/male.png";
import otherImage from "../images/other.jpg";

export default function StudentCard({ student, hideStudentCard }) {
  return (
    <Card className="card-style">
      <Row>
        <Col className="text-center">
          <button
            type="button"
            className="close d-block float-left"
            aria-label="Close"
            onClick={hideStudentCard}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="my-auto">
            <Card.Img
              className="ml-4 rounded-circle image"
              src={
                student.gender.toLowerCase() === "female"
                  ? femaleImage
                  : student.gender.toLowerCase() === "male"
                  ? maleImage
                  : otherImage
              }
            />
          </div>
        </Col>
        <Col>
          <Card.Body>
            <Card.Header>Student Details</Card.Header>
            <ListGroup variant="flush">
              {(function (student) {
                const studentDetailsToListItems = [];
                for (const detail in student) {
                  studentDetailsToListItems.push(
                    <ListGroup.Item>
                      {detail[0].toUpperCase() + detail.slice(1)}:{" "}
                      <span className="font-italic">{student[detail]}</span>
                    </ListGroup.Item>
                  );
                }
                return studentDetailsToListItems;
              })(student)}
            </ListGroup>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
