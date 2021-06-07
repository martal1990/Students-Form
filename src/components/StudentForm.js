import {
  Alert,
  Form,
  Col,
  Container,
  Button,
  ButtonGroup,
  ToggleButton,
  InputGroup,
} from "react-bootstrap";
import { FaUserAlt, FaMailBulk, FaCity, FaGraduationCap } from "react-icons/fa";
import { useState } from "react";
import ErrorMessages from "./ErrorMessages";

export default function StudentForm({ hideForm, addStudent }) {
  const genderRadios = [
    { name: "gender", value: "Male" },
    { name: "gender", value: "Female" },
    { name: "gender", value: "Other" },
  ];

  const [radioValue, setRadioValue] = useState("");

  const [studentData, setStudentData] = useState({
    username: {
      value: "",
      errors: [],
      validations: {
        required: true,
        pattern: /^.{2,}$/,
      },
    },
    email: {
      value: "",
      errors: [],
      validations: {
        required: true,
        pattern:
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      },
    },
    address: {
      value: "",
      errors: [],
      validations: {
        required: true,
        pattern: /[\s\S]{10,}/,
      },
    },
    course: {
      value: "",
      errors: [],
      validations: {
        required: true,
        pattern: "",
      },
    },
    gender: {
      value: "",
      errors: [],
      validations: {
        required: true,
        pattern: "",
      },
    },
  });

  const validateInput = ({ target: { value, name } }) => {
    const newErrors = [];
    const { validations } = studentData[name];

    if (validations.required && !value) {
      newErrors.push(`${name[0].toUpperCase() + name.slice(1)} is required`);
    }

    if (validations.pattern && !validations.pattern.test(value)) {
      if (name === "username") {
        newErrors.push(
          `${
            name[0].toUpperCase() + name.slice(1)
          } should be no less than 2 characters`
        );
      } else if (name === "email") {
        newErrors.push(`Invalid ${name}`);
      } else if (name === "address") {
        newErrors.push(
          `${
            name[0].toUpperCase() + name.slice(1)
          } should be no less than 10 characters`
        );
      }
    }
    setStudentData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: value,
        errors: newErrors,
      },
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let areInputsValid = true;
    let newStudent = {
      username: "",
      email: "",
      address: "",
      course: "",
      gender: "",
    };

    for (const detail in studentData) {
      validateInput({
        target: { value: studentData[detail].value, name: detail },
      });
      if (!studentData[detail].value) areInputsValid = false;
      else newStudent = { ...newStudent, [detail]: studentData[detail].value };
    }

    if (areInputsValid) {
      console.log(newStudent);
      addStudent(newStudent);
      hideForm();
    }
  };

  return (
    <Alert variant="success">
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={hideForm}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <Alert.Heading className="text-center">Student Details</Alert.Heading>
      <p className="text-success text-center">
        Hello student! Please fill in your details
      </p>
      <hr />
      <Form onSubmit={onSubmitHandler}>
        <Container>
          <Form.Row controlId="formBasicUsername" className="mb-3">
            <Col md={5}>
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FaUserAlt />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  className={
                    studentData.username.errors.length > 0 ? "invalidBg" : ""
                  }
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  onBlur={validateInput}
                ></Form.Control>
              </InputGroup>
              <ErrorMessages errors={studentData.username.errors} />
            </Col>
            <Col md={{ span: 5, offset: 2 }}>
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FaMailBulk />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  className={
                    studentData.email.errors.length > 0 ? "invalidBg" : ""
                  }
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  onBlur={validateInput}
                />
              </InputGroup>
              <ErrorMessages errors={studentData.email.errors} />
            </Col>
          </Form.Row>

          <Form.Group controlId="exampleForm.ControlTextarea1" className="mb-3">
            <Form.Label>Address</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FaCity />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className={
                  studentData.address.errors.length > 0 ? "invalidBg" : ""
                }
                as="textarea"
                rows={2}
                name="address"
                placeholder="Street, Number, City, Zip"
                onBlur={validateInput}
              />
            </InputGroup>
            <ErrorMessages errors={studentData.address.errors} />
          </Form.Group>

          <Form.Row className="mb-4">
            <Col md={5}>
              <Form.Label>Course</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FaGraduationCap />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  as="select"
                  className={
                    studentData.course.errors.length > 0 ? "invalidBg" : ""
                  }
                  name="course"
                  onBlur={validateInput}
                >
                  <option value="">Select Course</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="React">React</option>
                  <option value="CSS">CSS</option>
                </Form.Control>
              </InputGroup>
              <ErrorMessages errors={studentData.course.errors} />
            </Col>
            <Col md={{ span: 5, offset: 2 }}>
              <Form.Label>Gender</Form.Label>
              <div>
                <ButtonGroup
                  toggle
                  aria-labelledby="gender"
                  className={
                    studentData.gender.errors.length > 0 ? "invalidBg" : ""
                  }
                >
                  {genderRadios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      type="radio"
                      variant="outline-success"
                      name={radio.name}
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => {
                        validateInput(e);
                        setRadioValue(e.currentTarget.value);
                      }}
                    >
                      {radio.value[0].toUpperCase() + radio.value.slice(1)}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div>
              <ErrorMessages errors={studentData.gender.errors} />
            </Col>
          </Form.Row>
        </Container>
        <Button type="submit" className="btn-block mt-3">
          Submit
        </Button>
      </Form>
    </Alert>
  );
}
