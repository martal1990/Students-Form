import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {useState} from 'react';
import StudentForm from './components/StudentForm';
import {getEnrolledStudents, addNewStudent, sortByUsername} from './DAL/api';
import MyNavbar from './components/MyNavbar';
import {Modal, Row, Col, Container, Nav, Button, Navbar} from 'react-bootstrap';
import StudentsTable from './components/StudentsTable';



function App() {

  const [updatedStudentsList, setUpdatedStudentsList] = useState(getEnrolledStudents());

  const sortStudentsList = () => setUpdatedStudentsList([...sortByUsername()]);
  const addNewStudentandUpdate = (student) => {
    addNewStudent(student);
    setUpdatedStudentsList([...getEnrolledStudents()]);
  }

  const [showForm, setShowForm] = useState(false);
  const displayForm = () => setShowForm(true);
  const hideForm = () => setShowForm(false);

  return (<>
    <MyNavbar displayForm={displayForm} sortStudentsList={sortStudentsList}/>
    <Modal show={showForm} size="lg" onHide={hideForm}>
      <StudentForm hideForm={hideForm} addStudent={addNewStudentandUpdate}/>
    </Modal>
    <Container className="mt-3">
    <StudentsTable studentList={updatedStudentsList} />
    </Container>
    </>
  );
}

export default App;
