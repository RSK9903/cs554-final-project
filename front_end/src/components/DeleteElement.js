import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { Redirect } from "react-router-dom";
import API from "../API";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../App.css";

function DeleteElement(props) {
    const { currentUser } = useContext(AuthContext);
    const [deleted, setDeleted] = useState(false);
    const elementType = props.elementType;
    const elementId = props.elementId;
    const fromAccount = props.fromAccount;
    let redirectRecipeId = "";
    let buttonText = "Delete";

    useEffect(() => {
        async function fetchData() {
            console.log("Used")
        }
        fetchData();
      }, []);

    if (elementType == "recipe")
        buttonText = "Delete Recipe";

    if (elementType == "review")
        buttonText = "Delete Comment";
    
    const handleDelete = async (event) => {
        if (elementType == "recipe") {
            try{
                await API.delete(`/recipes/${elementId}`);
                setDeleted(true);
            } catch(e) {
                console.log(e)
            }
        } else if (elementType == "review") {
            console.log("Reached here")
            try{
                let { data:reviewData } = await API.get(`/reviews/${elementId}`);
                if (reviewData) {
                    console.log("WE HAVE REVIEW DATA");
                    redirectRecipeId = reviewData.recipe_id;
                }
                const {data:deletion} = await API.delete(`/reviews/${elementId}`);
                console.log(deletion)
                setDeleted(true);
            } catch (e) {
                console.log(e);
            }
            
        }
    };
    
    if (currentUser && deleted && elementType == "recipe") {
        if (!alert("Recipe deleted")) {
            return <Redirect to={"/recipes/"} />;
        }
        setDeleted(false);
    } 

    if (currentUser && deleted && elementType == "review") {
        if (!alert("Review deleted")) {
            window.location.reload();
            // return <Redirect to={"/account"} />;
            // if (!fromAccount) {
            //     return <Redirect to={`/recipes/${redirectRecipeId}`} />;
            // } else {
            //     return <Redirect to={"/account/"} />;
            // }
        }
        setDeleted(false);
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