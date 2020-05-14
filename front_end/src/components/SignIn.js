import React, { useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { doSignInWithEmailAndPassword, doPasswordReset } from '../firebase/FirebaseFunctions';
import { Container, Row, Col, Jumbotron, Form, Button } from 'react-bootstrap';

function SignIn() {
	const { currentUser } = useContext(AuthContext);
	const handleLogin = async (event) => {
		event.preventDefault();
		let { email, password } = event.target.elements;

		try {
			await doSignInWithEmailAndPassword(email.value, password.value);
		} catch (error) {
			alert(error);
		}
	};

	const passwordReset = (event) => {
		event.preventDefault();
		let email = document.getElementById('email').value;
		if (email) {
			doPasswordReset(email);
			alert('Password reset email was sent');
		} else {
			alert('Please enter an email address below before you click the forgot password link');
		}
	};
	if (currentUser) {
		return <Redirect to='/' />;
	}
	return (
		<Container>
			<Row>
				<Col>
					<div style={{ background: '#4444', padding: '15px', marginBottom: '5%', marginTop: '5%' }}>
						<h1>Login</h1>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form onSubmit={handleLogin}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control name='email' id='email' type="email" placeholder="Enter email" required />
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" name='password' required />
						</Form.Group>
						<Button variant="dark" type='submit'>Log in</Button>
						<Button variant="dark" className='forgotPassword' onClick={passwordReset}>
							Forgot Password
						</Button>
					</Form>

					<br />
					<SocialSignIn />
				</Col>
			</Row>
		</Container>
	);
}

export default SignIn;
