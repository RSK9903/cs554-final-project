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
      displayName,
      birthday,
      email,
      passwordOne,
      passwordTwo,
    } = e.target.elements;
    let user = {};
    user.displayName = displayName.value;
    user.birthday = birthday.value;
    user.email = email.value;
    setUser(user);
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch("Passwords do not match");
      return false;
    }
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
  const addUser = async (bool) => {
    try {
      if(bool){
        userData.id = currentUser.uid;
        await API.post("users/", userData);
      } else {
        const socialUser = {
          id: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          birthday: "",
        }
        console.log(socialUser);
        await API.post("users/", socialUser);
      }      
    } catch (error) {
      alert("Error with sign up: " + error);
    }
  };

  if (currentUser) {
    if (userData){
      console.log("Should not reach here");
      addUser(true);
    } else {
      console.log("Should reach here")
      addUser(false);
    }
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="sign-up">
            <h1>Sign up</h1>
            {pwMatch && <h4 className="error">{pwMatch}</h4>}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSignUp}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                name="displayName"
                type="text"
                placeholder="Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicBirthday">
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
