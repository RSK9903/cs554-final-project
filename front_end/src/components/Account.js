import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import SignOutButton from "./SignOut";
import "../App.css";
import ChangePassword from "./ChangePassword";
import ChangeInfo from "./ChangeInfo";
import API from "../API";
import { Container, Row, Col } from "react-bootstrap";

function Account() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      try {
        let id = currentUser.uid;
        const { data: userInfo } = await API.get("users/" + id);
        setUser(userInfo);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <div
            style={{
              background: "#4444",
              padding: "15px",
              marginBottom: "5%",
              marginTop: "5%",
            }}
          >
            <h2>Account Page</h2>
            <h3>
              Name: {user && user.firstName} {user && user.lastName}
            </h3>
            <h3>Email: {user && user.email}</h3>
            <h3>Birthday: {user && user.birthday}</h3>
          </div>
          <ChangeInfo />
          <ChangeInfo />
          <ChangePassword />
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
