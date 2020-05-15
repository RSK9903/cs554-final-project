import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import { doChangePassword } from '../firebase/FirebaseFunctions';
import '../App.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

function ChangePassword() {
	const { currentUser } = useContext(AuthContext);
	const [pwMatch, setPwMatch] = useState('');
	console.log(currentUser);

	const submitForm = async (event) => {
		event.preventDefault();
		const { currentPassword, newPasswordOne, newPasswordTwo } = event.target.elements;

		if (newPasswordOne.value !== newPasswordTwo.value) {
			setPwMatch('New Passwords do not match, please try again');
			return false;
		}

		try {
			await doChangePassword(currentUser.email, currentPassword.value, newPasswordOne.value);
			alert('Password has been changed, you will now be logged out');
		} catch (error) {
			alert(error);
		}
	};
	if (currentUser.providerData[0].providerId === 'password') {
		return (
			<Container>
				<Row>
					<Col>
						{pwMatch && <h4 className='error'>{pwMatch}</h4>}
					</Col>
				</Row>
				<Row style={{ marginTop: '5%' }}>
					<Col>
						<Form onSubmit={submitForm}>
							<Form.Group controlId="formBasicOldPass">
								<Form.Label>Current Password</Form.Label>
								<Form.Control
									name='currentPassword'
									id='currentPassword'
									type='password'
									placeholder='Current Password'
									required />
							</Form.Group>
							<Form.Group controlId="formBasicNewPass">
								<Form.Label>New Password</Form.Label>
								<Form.Control
									name='newPasswordOne'
									id='newPasswordOne'
									type='password'
									placeholder='Password'
									required />
							</Form.Group>
							<Form.Group controlId="formBasicNewPassConfirm">
								<Form.Label>Confirm New Password</Form.Label>
								<Form.Control
									name='newPasswordTwo'
									id='newPasswordTwo'
									type='password'
									placeholder='Confirm Password'
									required />
							</Form.Group>
							<Button type='submit' variant="dark">Change Password</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		);
	} else {
		return (
			<div>
				<h2>You are signed in using a Social Media Provider, You cannot change your password</h2>
			</div>
		);
	}
}

export default ChangePassword;
