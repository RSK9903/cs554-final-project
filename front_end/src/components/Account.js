import React from 'react';
import SignOutButton from './SignOut';
import '../App.css';
import ChangePassword from './ChangePassword';
import { Container, Row, Col } from 'react-bootstrap';

function Account() {
	return (
		<Container>
			<Row>
				<Col>
					<div style={{ background: '#4444', padding: '15px', marginBottom: '5%', marginTop: '5%' }}>
						<h2>Account Page</h2>
					</div>
					<ChangePassword />
				</Col>
			</Row>
		</Container>
	);
}

export default Account;
