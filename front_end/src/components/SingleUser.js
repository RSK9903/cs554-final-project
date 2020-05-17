import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import "../App.css";
import API from "../API";
import UserReviewList from "./UserReviewList";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import {Link} from "react-router-dom";

const User = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(undefined);
	const [recipes, setRecipes] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
        try {
          const { data:user } = await API.get("/users/"+props.match.params.id);
          const { data: recipeList } = await API.get("recipes/users/"+props.match.params.id);
          setUser(user);
          setRecipes(recipeList);
        } catch (e) {
          console.log(e);
        }
    }
    fetchData();
  },
  [props.match.params.id]);

  if(props.match.params.id==currentUser.uid){
    return <Redirect to="/account" />;
  }

  const createRecipeLine = (recipe) => {
		return <li><Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link></li>;
	  };

	const recipeli =
    recipes &&
    recipes.map((i) => {
      return createRecipeLine(i);
  });
  
  let birthday="";
  if(user && user.birthday){
		birthday= <h4>Birthday: {user && user.birthday}</h4>;
  }
  
  let bio="";
  if(user && user.bio){
		bio= <h4>Bio: {user && user.bio}</h4>
	} else {
    bio = <h4>No Bio</h4>
  }
  
  return(
    <Container>
			<Row>
				<Col>
					<Tabs defaultActiveKey="myInfo" id="uncontrolled-tab-example" style={{ marginTop: '5%' }}>
						<Tab eventKey="myInfo" title="User Info">
							<div className="userPage">
								<h3>{user && user.displayName}</h3>
								{birthday}
                {bio}
							</div>
						</Tab>
            <Tab eventKey="viewRecipes" title="Recipes">
              <div className="userPage">
                <h3>Recipes</h3>
                <ul>{recipeli}</ul>
              </div>
						</Tab>
						<Tab eventKey="viewReviews" title="Reviews">
							<UserReviewList id={props.match.params.id}/>
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</Container>
  );
}

export default User;