import React, { useContext, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../App.css";
import API from "../API";

function ChangeInfo() {
  const { currentUser } = useContext(AuthContext);

  const submitForm = async (event) => {
    event.preventDefault();
    const { newName, newBirthday, newBiography } = event.target.elements;

    let newInfo = {};
    if (newName.value) {
      newInfo.displayName = newName.value;
    }
    if (newBirthday.value) {
      newInfo.birthday = newBirthday.value;
    }
    if (newBiography.value) {
      newInfo.bio = newBiography.value;
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
  let notSocial = currentUser && (currentUser.providerData[0].providerId === 'password');
  
  let nameInput = null;
  if(notSocial){
    nameInput = <Form.Control
                  name="newName"
                  id="newName"
                  type="text"
                  placeholder="New Display Name"
                />;
  } else {
    nameInput = <Form.Control
                  disabled
                  name="newName"
                  id="newName"
                  type="text"
                  placeholder="Cannot change display name because you are using a social media provider"
                />;
  }

  return (
    <Container>
      <Row>
        <Col style={{ marginTop: '5%' }}>
          <Form onSubmit={submitForm}>
            <Form.Group controlId="formBasicName">
              <Form.Label>New Display Name</Form.Label>
              {nameInput}
            </Form.Group>
            <Form.Group controlId="formBasicBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                name="newBirthday"
                id="newBirthday"
                type="date"
              />
            </Form.Group>
            <Form.Group controlId="formBasicBio">
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="newBiography"
                id="newBiography"
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
