import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShowHistory from "./ShowHistory";
import { AuthContext } from "../firebase/Auth";
import {
  Carousel,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import API from "../API";
import "../App.css";


function Home() {
  const [recipes, setRecipes] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await API.get("/recipes");
        setRecipes(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  console.log(recipes);

  if (recipes) {
    return (
      <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Row>
          <Col>
            <Carousel>
              {recipes.map(recipe => {
                const imagePath = `http://localhost:5000/img/${recipe._id}.jpg`;
                console.log(imagePath);
                return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={imagePath}
                      alt={recipes && recipes.title}
                      onError={(e)=>{
                        e.target.onerror=null;
                        e.target.src= "/imgs/1.jpg";
                      }}
                    />
                    <Carousel.Caption>
                      <Link to={`/recipes/${recipe._id}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}><h3>{recipe.title}</h3></Link>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </Col>
        </Row>
        <ShowHistory />
      </Container >
    );
  }
  return (
    <Spinner animation="border" role="status" style={{ position: 'absolute', left: '50%', top: '50%' }}>
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export default Home;
