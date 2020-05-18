import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../App.css";
import API from "../API";

function EditReview(props) {
  const { currentUser } = useContext(AuthContext);
  const [oldData, setData] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const {data} = await API.get("/reviews/"+props.match.params.id);
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
    const { newRating, newComment } = event.target.elements;

    let newInfo = {};
    newInfo.rating = parseInt(newRating.value);
    newInfo.comment = newComment.value;
    try {
      await API.put("/reviews/" + oldData._id, newInfo);
      setSubmitted(true)
    } catch (error) {
      alert("An error occurred. Changes could not be applied.");
    }
  };

  if(submitted){
    if (!alert("Review updated.")) {
        return <Redirect to={"/recipes/" + oldData.recipe_id} />;
    }
    setSubmitted(false)
  }

  let oldRating = "";
  if(oldData.rating!=""){
    oldRating = oldData.rating;
  }

  let oldComment = "";
  if(oldData.comment!=""){
    oldComment = oldData.comment;
  }

  if(currentUser && oldData && oldData.author_id!=currentUser.uid){
    if (!alert("You do not have access to this page!")) {
        return <Redirect to={"/account"} />;
        }
  } else {
  return (
    <Container>
      <Row>
        <Col style={{ marginTop: '5%' }}>
          <Form onSubmit={submitForm}>
            <Form.Group controlId="editReviewRating">
              <Form.Label>New Rating</Form.Label>
              <Form.Control
                name="newRating"
                id="newRating"
                type="number"
                defaultValue={oldRating}
              />
            </Form.Group>
            <Form.Group controlId="editReviewComment">
              <Form.Label>New Comment</Form.Label>
              <Form.Control
                name="newComment"
                id="newComment"
                type="text"
                defaultValue={oldComment}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
  }
}

export default EditReview;
