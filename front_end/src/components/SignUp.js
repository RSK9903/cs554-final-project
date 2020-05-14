import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function SignUp() {
	const { currentUser } = useContext(AuthContext);
	const [pwMatch, setPwMatch] = useState('');
	const handleSignUp = async (e) => {
		e.preventDefault();
		const { displayName, email, passwordOne, passwordTwo } = e.target.elements;
		if (passwordOne.value !== passwordTwo.value) {
			setPwMatch('Passwords do not match');
			return false;
		}

		try {
			await doCreateUserWithEmailAndPassword(email.value, passwordOne.value, displayName);

		} catch (error) {
			alert(error);
		}
	};

	if (currentUser) {
		return <Redirect to='/home' />;
	}

	return (
		<Container>
			<Row>
				<Col>
					<div style={{ background: '#4444', padding: '15px', marginBottom: '5%', marginTop: '5%' }}>
						<h1>Sign up</h1>
						{pwMatch && <h4 className='error'>{pwMatch}</h4>}
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form onSubmit={handleSignUp}>
						<Form.Group controlId="formBasicName">
							<Form.Label>Name</Form.Label>
							<Form.Control required name='displayName' type='text' placeholder='Name' />
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control required name='email' type='email' placeholder='Email' />
						</Form.Group>
						<Form.Group controlId="formBasicNewPassConfirm">
							<Form.Label>Password</Form.Label>
							<Form.Control
								id='passwordOne'
								name='passwordOne'
								type='password'
								placeholder='Password'
								required />
						</Form.Group>
						<Form.Group controlId="formBasicNewPassConfirm">
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								name='passwordTwo'
								type='password'
								placeholder='Confirm Password'
								required />
						</Form.Group>
						<Button variant='dark' id='submitButton' name='submitButton' type='submit'>
							Sign Up
						</Button>
					</Form>
				</Col>
			</Row>
			<SocialSignIn />
		</Container>
		// <div>
		// 	<h1>Sign up</h1>
		// 	{pwMatch && <h4 className='error'>{pwMatch}</h4>}
		// 	<form onSubmit={handleSignUp}>
		// 		<div className='form-group'>
		// 			<label>
		// 				Name:
		// 				<input className='form-control' required name='displayName' type='text' placeholder='Name' />
		// 			</label>
		// 		</div>
		// 		<div className='form-group'>
		// 			<label>
		// 				Email:
		// 				<input className='form-control' required name='email' type='email' placeholder='Email' />
		// 			</label>
		// 		</div>
		// 		<div className='form-group'>
		// 			<label>
		// 				Password:
		// 				<input
		// 					className='form-control'
		// 					id='passwordOne'
		// 					name='passwordOne'
		// 					type='password'
		// 					placeholder='Password'
		// 					required
		// 				/>
		// 			</label>
		// 		</div>
		// 		<div className='form-group'>
		// 			<label>
		// 				Confirm Password:
		// 				<input
		// 					className='form-control'
		// 					name='passwordTwo'
		// 					type='password'
		// 					placeholder='Confirm Password'
		// 					required
		// 				/>
		// 			</label>
		// 		</div>
		// 		<button id='submitButton' name='submitButton' type='submit'>
		// 			Sign Up
		// 		</button>
		// 	</form>
		// 	<br />
		// 	<SocialSignIn />
		// </div>
	);
}

export default SignUp;
