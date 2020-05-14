import React, { useContext, useState } from 'react';
import { AuthContext } from '../firebase/Auth';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import ChangeInfo from './ChangeInfo';
import { Container, Row, Col } from 'react-bootstrap';
function Account() {
	const { currentUser } = useContext(AuthContext);

	return (
		<Container>
			<Row>
				<Col>
					<div style={{ background: '#4444', padding: '15px', marginBottom: '5%', marginTop: '5%' }}>
						<h2>Account Page</h2>
					</div>
					<ChangeInfo />
					<ChangePassword />
				</Col>
			</Row>
		</Container>
	);
}

export default Account;
