import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { updateName } from "../firebase/FirebaseFunctions";
import "../App.css";
import API from "../API";

function ChangeInfo() {
  const { currentUser } = useContext(AuthContext);
  const [oldData, setData] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await API.get("users/"+currentUser.uid);
        setData(data);
      }
      catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    const { newName, newBirthday, newBiography } = event.target.elements;

    let newInfo = {};
    if (newName.value) {
      newInfo.displayName = newName.value;
      try {
        await updateName(newInfo.displayName);
      } catch (error) {
        alert(error);
      }
    }
    if (newBirthday.value) {
      newInfo.birthday = newBirthday.value;
    }
    if (newBiography.value || newBiography.value=="") {
      newInfo.bio = newBiography.value;
    }
    try {
      await API.patch("users/" + currentUser.uid, newInfo);
      setSubmitted(true)
      
    } catch (error) {
      alert("An error occurred. Changes could not be applied.");
    }
  };

  if(submitted){
    if (!alert("Your information has been changed.")) {
      window.location.reload();
    }
    setSubmitted(false)
  }

  let notSocial = currentUser && (currentUser.providerData[0].providerId === 'password');

  let oldName = "";
  if(oldData){
    oldName=oldData.displayName;
  }

  let nameInput = null;
  if(notSocial){
    nameInput = <Form.Control
                  name="newName"
                  id="newName"
                  type="text"
                  placeholder="New Display Name"
                  defaultValue={oldName}
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

  let oldDate = "";
  if(oldData.birthday!=""){
    oldDate = oldData.birthday;
  }

  let oldBio = "";
  if(oldData.bio!=""){
    oldBio = oldData.bio;
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
                defaultValue={oldDate}
              />
            </Form.Group>
            <Form.Group controlId="formBasicBio">
              <Form.Label>Biography</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="newBiography"
                id="newBiography"
                defaultValue={oldBio}
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
