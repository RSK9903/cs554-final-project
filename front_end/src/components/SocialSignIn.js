import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';
import { Container, Row, Col } from 'react-bootstrap';

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
				<div style={{ marginTop: '5%' }}>
					<img onClick={() => socialSignOn('google')} alt='google signin' src='/imgs/btn_google_signin.png' />
				</div>
				<div style={{ marginTop: '5%' }}>
					<img onClick={() => socialSignOn('facebook')} alt='google signin' src='/imgs/facebook_signin.png' />
				</div>
			</Col>
		</Row>
	);
};

export default SocialSignIn;
