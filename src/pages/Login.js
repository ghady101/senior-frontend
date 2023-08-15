import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
import { useLoginMutation } from '../services/appApi';
import axios from 'axios';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, { isError, isLoading, error }] = useLoginMutation();

	const [banners, setBanners] = useState([]);

	useEffect(() => {
		// 1
		axios
			.get('http://localhost:1035/banners')
			.then(({ data }) => {
				setBanners(data);
				console.log(banners);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const forthBan = banners[3];

	function handleLogin(e) {
		e.preventDefault();
		login({ email, password });
	}
	return (
		<Container>
			<Row>
				<Col md={6} className='login__form--container'>
					<Form style={{ width: '100%' }} onSubmit={handleLogin}>
						<h1>Login to your account</h1>
						{isError && <Alert variant='danger'>{error.data}</Alert>}
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

						{/* login button */}
						<Form.Group>
							{/* disabled={isLoading} so we don't spam we clicking */}
							<Button type='submit' disabled={isLoading}>
								Login
							</Button>
						</Form.Group>

						{/* to register */}
						<p className='pt-3 text-center'>
							Don't have an account? <Link to='/signup'>Create account</Link>
						</p>
					</Form>
				</Col>
				{/* login__image--container */}
				<Col md={6} className=''>
					{forthBan && (
						<img
							src={forthBan?.pictures[0].url}
							className='firstImg home-banner'
							alt=''
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
