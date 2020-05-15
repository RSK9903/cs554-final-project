import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../App.css";
import API from "../API";

function ChangeInfo() {
  const { currentUser } = useContext(AuthContext);

  const submitForm = async (event) => {
    event.preventDefault();
    const { newFirst, newLast, newBirthday } = event.target.elements;

    let newInfo = {};
    if (newFirst.value) {
      newInfo.firstName = newFirst.value;
    }
    if (newLast.value) {
      newInfo.lastName = newLast.value;
    }
    if (newBirthday.value) {
      newInfo.birthday = newBirthday.value;
    }
    try {
      await API.patch("users/" + currentUser.uid, newInfo);
      if (!alert("Your information has been changed.")) {
        window.location.reload();
      }
    } catch (error) {
      alert("An error occurred. Changes could not be applied.");
    }
  };
  return (
    <Container>
      <Row>
        <Col style={{ marginTop: '5%' }}>
          <Form onSubmit={submitForm}>
            <Form.Group controlId="formBasicName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="newFirst"
                id="newFirst"
                type="text"
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="newLast"
                id="newLast"
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                name="newBirthday"
                id="newBirthday"
                type="date"
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Change User Information
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangeInfo;
