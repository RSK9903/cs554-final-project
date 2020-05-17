import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../API";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../App.css";

function DeleteElement(props) {
    const [deleted, setDeleted] = useState(false);
    const elementType = props.elementType;
    const elementId = props.elementId;
    const fromAccount = props.fromAccount;
    let redirectRecipeId = "";
    let buttonText = "Delete";

    if (elementType == "recipe")
        buttonText = "Delete Recipe";

    if (elementType == "review")
        buttonText = "Delete Comment";
    
    const handleDelete = async (event) => {
        // event.preventDefault();
        if (elementType == "recipe") {
            await API.delete(`/recipes/${elementId}`);
            setDeleted(true);
        } else if (elementType == "review") {
            let { reviewData } = await API.get(`/reviews/${elementId}`);
            if (reviewData && !fromAccount) {
                redirectRecipeId = reviewData.recipe_id;
            }
            await API.delete(`/reviews/${elementId}`);
            setDeleted(true);
        }
    };
    
    if (deleted && elementType == "recipe") {
        setDeleted(false);
        return <Redirect to={"/recipes/"} />;
    }

    if (deleted && elementType == "review") {
        setDeleted(false);
        if (!fromAccount) {
            return <Redirect to={`/recipes/${redirectRecipeId}`} />;
        } else {
            return <Redirect to={"/account/"} />;
        }
    }

    return(
        <Container>
            <Row>
                <Col>
                    <Button variant="dark" type="button" onClick={handleDelete}>{buttonText}</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DeleteElement;