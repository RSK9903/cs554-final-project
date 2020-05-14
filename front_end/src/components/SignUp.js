import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import SocialSignIn from "./SocialSignIn";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import API from "../API";

function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState("");
  const [userData, setUser] = useState(undefined);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const {
      first,
      last,
      birthday,
      email,
      passwordOne,
      passwordTwo,
    } = e.target.elements;
    let user = {};
    user.firstName = first.value;
    user.lastName = last.value;
    user.birthday = birthday.value;
    user.email = email.value;
    setUser(user);
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch("Passwords do not match");
      return false;
    }
    let displayName = first.value + " " + last.value;
    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value,
        displayName
      );
    } catch (error) {
      alert(error);
    }
  };
  const addUser = async (user) => {
    try {
      userData.id = currentUser.uid;
      await API.post("users/", userData);
    } catch (error) {
      alert("Error with post" + error);
    }
  };

  if (currentUser) {
    addUser();
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <div
            style={{
              background: "#4444",
              padding: "15px",
              marginBottom: "5%",
              marginTop: "5%",
            }}
          >
            <h1>Sign up</h1>
            {pwMatch && <h4 className="error">{pwMatch}</h4>}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSignUp}>
            <Form.Group controlId="formBasicName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                name="first"
                type="text"
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                name="last"
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                required
                name="birthday"
                type="date"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                name="email"
                type="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicNewPassConfirm">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="passwordOne"
                name="passwordOne"
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicNewPassConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="passwordTwo"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </Form.Group>
            <Button
              variant="dark"
              id="submitButton"
              name="submitButton"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
      <SocialSignIn />
    </Container>
  );
}

export default SignUp;
