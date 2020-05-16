import React from "react";
import { doSocialSignIn } from "../firebase/FirebaseFunctions";
import { Container, Row, Col } from "react-bootstrap";

const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
    } catch (error) {
      alert(error);
    }
  };
  
  return (
    <Row>
      <Col>
        <div className="social-sign-in">
          <img
            onClick={() => socialSignOn("google")}
            alt="Google Sign-In"
            src="/imgs/btn_google_signin.png"
          />
          <img
            onClick={() => socialSignOn("facebook")}
            alt="Facebook Sign-In"
            src="/imgs/facebook_signin.png"
          />
        </div>
      </Col>
    </Row>
  );
};

export default SocialSignIn;
