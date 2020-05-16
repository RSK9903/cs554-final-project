import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import UserReviewList from "./UserReviewList";
import "../App.css";
import ChangePassword from "./ChangePassword";
import ChangeInfo from "./ChangeInfo";
import API from "../API";
import { Container, Row, Col, Tabs, Tab, Nav } from "react-bootstrap";
import {Link} from "react-router-dom";


function Account() {
	const { currentUser } = useContext(AuthContext);
	const [user, setUser] = useState(undefined);
	const [recipes, setRecipes] = useState(undefined);

	useEffect(() => {
		async function fetchData() {
			try {
				let id = currentUser.uid;
				const { data: userInfo } = await API.get("users/" + id);
				const { data: recipeList } = await API.get("recipes/users/"+id);
				setUser(userInfo);
				setRecipes(recipeList);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

	const createRecipeLine = (recipe) => {
		return <li key={recipe._id}><Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link></li>;
	  };

	const recipeli =
    recipes &&
    recipes.map((i) => {
      return createRecipeLine(i);
	});
	
	return (
		<Container>
			<Row>
				<Col>
					<Tabs defaultActiveKey="myInfo" id="uncontrolled-tab-example" style={{ marginTop: '5%' }}>
						<Tab eventKey="myInfo" title="My Info">
							{/* <User /> */}
							<div className="userPage">
								<h3>{user && user.firstName} {user && user.lastName}</h3>
								<h4>Email: {user && user.email}</h4>
								<h4>Birthday: {user && user.birthday}</h4>
							</div>
						</Tab>
						<Tab eventKey="viewRecipes" title="My Recipes">
							<div className="userPage">
								<h3>Recipes</h3>
								<ul>{recipeli}</ul>
							</div>
						</Tab>
						<Tab eventKey="viewReviews" title="My Reviews">
							<UserReviewList id={currentUser.uid}/>
						</Tab>
						<Tab eventKey="changeInfo" title="Change Info">
							<ChangeInfo />
						</Tab>
						<Tab eventKey="changePass" title="Change Password" >
							<ChangePassword />
						</Tab>
					</Tabs>
				</Col>
			</Row>
		</Container>
		// <Tab.Container id="left-tabs-example" defaultActiveKey="first">
		// 	<Row>
		// 		<Col sm={3}>
		// 			<Nav variant="pills" className="flex-column">
		// 				<Nav.Item>
		// 					<Nav.Link eventKey="myInfo">My Info</Nav.Link>
		// 				</Nav.Item>
		// 				<Nav.Item>
		// 					<Nav.Link eventKey="changeInfo">Change Info</Nav.Link>
		// 				</Nav.Item>
		// 				<Nav.Item>
		// 					<Nav.Link eventKey="changePass">Change Password</Nav.Link>
		// 				</Nav.Item>
		// 			</Nav>
		// 		</Col>
		// 		<Col sm={9}>
		// 			<Tab.Content>
		// 				<Tab.Pane eventKey="myInfo">
		// 					<div className="account">
		// 						<h2>Account Page</h2>
		// 						<h3>
		// 							Name: {user && user.firstName} {user && user.lastName}
		// 						</h3>
		// 						<h3>Email: {user && user.email}</h3>
		// 						<h3>Birthday: {user && user.birthday}</h3>
		// 					</div>
		// 				</Tab.Pane>
		// 				<Tab.Pane eventKey="changeInfo">
		// 					<ChangeInfo />
		// 				</Tab.Pane>
		// 				<Tab.Pane eventKey="changePass">
		// 					<ChangePassword />
		// 				</Tab.Pane>
		// 			</Tab.Content>
		// 		</Col>
		// 	</Row>
		// </Tab.Container>
	);
}

export default Account;
