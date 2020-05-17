import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../API";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../App.css";

function DeleteElement(props) {
    const [deleted, setDeleted] = useState(false);
    const elementType = props.elementType;
    const elementId = props.elementId;
    let redirectRecipeId = "";
    
    const handleDelete = async (event) => {
        event.preventDefault();
        if (elementType == "recipe") {
            await API.delete(`/recipes/${elementId}`);
        } else if (elementType == "review") {
            let { reviewData } = await API.get(`/review/${elementId}`);
            redirectRecipeId = reviewData._id;
            await API.delete(`/review/${elementId}`);
        }
        setDeleted(true);
    };

    if (deleted && elementType == "recipe") {
        return <Redirect to={"/recipes/"} />;
    }

    if (deleted && elementType == "review") {
        return <Redirect to={`/recipes/${redirectRecipeId}`} />;
    }

    return(
        <Container>
            <Row>
                <Col>
                    <Button variant="dark" type="button" onClick={handleDelete}>Delete</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DeleteElement;