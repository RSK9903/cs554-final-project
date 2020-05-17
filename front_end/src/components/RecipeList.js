import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import { Date } from "prismic-reactjs";
import "../App.css";
import API from "../API";
import Search from "./Search";

const RecipeList = (props) => {
  const [recipeData, setRecipeData] = useState(undefined);
  const [setDisplayNames, setGetDisplayNames] = useState(false);
  const [searchData, setSearchData] = useState(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [key, setKey] = useState(undefined);
  let li = null;

  useEffect(() => {
    async function fetchData() {
      if (searchTerm) {
        const { data } = await API.get("/recipes/search/" + searchTerm);
        setSearchData(data);
      } else {
        try {
          const { data } = await API.get("/recipes");
          data.reverse();
          setRecipeData(data);
          setSearchData(data);
        } catch (e) {
          console.log(e);
        }
      }
    }
    fetchData();
  }, [searchTerm]);

  const getDisplayNames = async () => {
    let index;
    for (index in recipeData) {
      let recipe = recipeData[index];
      const { data: user } = await API.get("users/" + recipe.author);
      recipe.displayName = user.displayName;
    }
    setGetDisplayNames(true);
  };

  if (recipeData && !setDisplayNames) {
    getDisplayNames();
  }

  const searchValue = async (value) => {
    setSearchTerm(value);
  };

  const buildListItem = (recipe) => {
    return (
      <li key={recipe._id}>
        <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
      </li>
    );
  };

  const sortByTitle = () => {
    const temp = [...recipeData];
    setRecipeData(
      temp.sort((a, b) => {
        const ra = a.title.toUpperCase();
        const rb = b.title.toUpperCase();

        if (ra > rb) return 1;
        if (rb > ra) return -1;
        return 0;
      })
    );
    console.log(recipeData);
  };

  const sortByDate = () => {
    const temp = [...recipeData];
    setRecipeData(
      temp.sort((a, b) => {
        const da = a.datePosted;
        const db = b.datePosted;

        if (da > db) return -1;
        if (db > da) return 1;
        return 0;
      })
    );
    console.log(recipeData);
  };

  const sortByAuthor = () => {
    const temp = [...recipeData];
    setRecipeData(
      temp.sort((a, b) => {
        const da = a.displayName;
        const db = b.displayName;

        if (da > db) return -1;
        if (db > da) return 1;
        return 0;
      })
    );
    console.log(recipeData);
  };

  if (searchTerm) {
    console.log(searchData);
    li =
      searchData &&
      searchData.map((recipe) => {
        // let { recipe } = recipes;
        // console.log(recipe);
        return buildListItem(recipe);
      });
  } else {
    li =
      recipeData &&
      recipeData.map((recipe) => {
        return buildListItem(recipe);
      });
  }

  const handleSelect = (newKey) => {
    setKey(newKey);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Tabs
            defaultActiveKey="allRecipes"
            onSelect={handleSelect}
            activeKey={key}
            id="uncontrolled-tab-example"
            style={{ marginTop: "5%" }}
          >
            <Tab eventKey="allRecipes" title="All Recipes">
              <div className="recipe-index">
                <h2 className="recipe-list-header">Recipe Index</h2>
                <label>Sort By: &nbsp;</label>
                <button onClick={() => sortByTitle()}>Title</button>
                <button onClick={() => sortByDate()}>
                  Most Recently Posted
                </button>
                <button onClick={() => sortByAuthor()}>Author</button>
                <table>
                  <tr className="table-headers">
                    <th>Recipe Title</th>
                    <th>Date Posted</th>
                    <th>Author</th>
                  </tr>
                  {recipeData &&
                    recipeData.map((recipe) => (
                      <tr>
                        <th>
                          <Link to={`/recipes/${recipe._id}`}>
                            {recipe.title}
                          </Link>
                        </th>
                        <th>
                          {Date(recipe.datePosted).getMonth() + 1}/
                          {Date(recipe.datePosted).getDate()}/
                          {Date(recipe.datePosted).getFullYear()}
                        </th>
                        <th>{recipe.displayName}</th>
                      </tr>
                    ))}
                </table>
              </div>
            </Tab>
            <Tab eventKey="searchRecipes" title="Search Recipes">
              <Search searchValue={searchValue} />
              {searchTerm ? (
                <ul className="recipe-list">{li}</ul>
              ) : (
                <ul className="recipe-list"></ul>
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeList;
