import {Table, Button, Row, Col} from 'react-bootstrap';
import StudentCard from './StudentCard';
import {FaAddressCard} from 'react-icons/fa';
import {useState} from 'react';

export default function StudentsTable({studentList}) {
  
  const [showStudentCard, setShowStudentCard] = useState(false);
  const displayStudentCard = () => setShowStudentCard(true);
  const hideStudentCard = () => setShowStudentCard(false);

  const [currentStudent, setCurrentStudent] = useState(studentList[0]);

  const renderStudentCard = (e) => {

    setCurrentStudent(studentList[e.currentTarget.id]);
    displayStudentCard();
  }
return (<>
  <Row>
  <Col md={showStudentCard ? 6 : ""}>
  <Table striped bordered hover className="text-center">
  <thead>
    <tr >
      <th>#</th>
      <th>Username</th>
      {/* <th>Gender</th> */}
      <th>Course</th>
      <th>Student Card</th>
    </tr>
  </thead>
  <tbody>
    {
      studentList.map((student, idx) => (
        <tr>
      <td>{`${idx+1}`}</td>
      <td>{student.username}</td>
      {/* <td>{student.gender}</td> */}
      <td>{student.course}</td>
      <td><Button id={idx} className="student-details" onClick={renderStudentCard}><FaAddressCard/></Button></td>
    </tr>
      ))
    }
  </tbody>
  </Table>
</Col>
{showStudentCard && <Col md={{span:5, offset: 1}}>
   <StudentCard student={currentStudent} hideStudentCard={hideStudentCard} />
</Col>}
</Row>
  </>
);
}