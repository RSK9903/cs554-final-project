import React, { useState, useEffect, useContext } from "react";
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
          const { data: recipeList } = await API.get("recipes/user/"+props.match.params.id);
          setUser(user);
          setRecipes(recipeList);
        } catch (e) {
          console.log(e);
        }
    }
    fetchData();
  },
  [props.match.params.id]);

  const createRecipeLine = (recipe) => {
		return <li><Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link></li>;
	  };

	const recipeli =
    recipes &&
    recipes.map((i) => {
      return createRecipeLine(i);
  });
  
  return(
    <Container>
			<Row>
				<Col>
					<Tabs defaultActiveKey="myInfo" id="uncontrolled-tab-example" style={{ marginTop: '5%' }}>
						<Tab eventKey="myInfo" title="User Info">
							<div className="userPage">
								<h3>{user && user.firstName} {user && user.lastName}</h3>
								<h4>Birthday: {user && user.birthday}</h4>
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
    // <div>
    // <div className="userPage">
    //     <h3>{userData && userData.firstName} {userData && userData.lastName}</h3>
		//     <p>Birthday: {userData && userData.birthday}</p>
    //     <h3>Recipes</h3>
    //     <ul>
    //         <li>Recipe Placeholder</li>
    //     </ul>
    // </div>
    // <UserReviewList />
    // </div>
  );
}

export default User;