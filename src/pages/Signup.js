import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
import { useSignupMutation } from '../services/appApi';
import axios from 'axios';

function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [signup, { error, isLoading, isError }] = useSignupMutation();

	const [banners, setBanners] = useState([]);
	const thirdBan = banners[2];

	useEffect(() => {
		// 1
		axios
			.get('http://localhost:1035/banners')
			.then(({ data }) => {
				setBanners(data);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	function handleSignup(e) {
		e.preventDefault();
		signup({ name, email, password });
	}

	return (
		<Container>
			<Row>
				<Col md={6} className='signup__form--container'>
					<Form style={{ width: '100%' }} onSubmit={handleSignup}>
						<h1>Create an account</h1>
						{isError && <Alert variant='danger'>{error.data}</Alert>}
						{/* name */}
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Your name'
								value={name}
								required
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						{/* email */}
						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter your email'
								value={email}
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Form.Group>

						{/* password */}
						<Form.Group className='mb-3'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter your password'
								value={password}
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Form.Group>

						{/* create account */}
						<Form.Group>
							<Button type='submit' disabled={isLoading}>
								Create account
							</Button>
						</Form.Group>
						<p className='pt-3 text-center'>
							Already have an account? <Link to='/login'>Login</Link>{' '}
						</p>
					</Form>
				</Col>
				{/* signup__image--container */}
				<Col md={6} className=''>
					{thirdBan && (
						<img
							src={thirdBan?.pictures[0].url}
							className='firstImg home-banner'
							alt=''
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default Signup;
