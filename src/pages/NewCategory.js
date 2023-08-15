import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCreateCategoryMutation } from '../services/appApi';
import './NewCategory.css';
import axios from 'axios';

function NewCategory() {
	const [name, setName] = useState('');
	const [images, setImages] = useState([]);
	const navigate = useNavigate();
	const [createCategory, { isError, error, isLoading, isSuccess }] =
		useCreateCategoryMutation();

	const [banners, setBanners] = useState([]);
	const fifthBan = banners[4];

	useEffect(() => {
		axios
			.get('http://localhost:1035/banners')
			.then(({ data }) => {
				setBanners(data);
			})
			.catch((e) => {
				console.log(e);
			});
	});

	function handleSubmit(e) {
		e.preventDefault();
		if (!name || !images.length) {
			return alert('Please fill out all the fields');
		}
		createCategory({ name, images }).then(({ data }) => {
			if (data.length > 0) {
				setTimeout(() => {
					navigate('/');
				}, 1500);
			}
		});
	}

	function showWidget() {
		const widget = window.cloudinary.createUploadWidget(
			{
				cloudName: 'phoenicia-university',
				uploadPreset: 'mg7hncbx',
			},
			(error, result) => {
				if (!error && result.event === 'success') {
					setImages((prev) => [
						...prev,
						{ url: result.info.url, public_id: result.info.public_id },
					]);
				}
			}
		);
		widget.open();
	}

	return (
		<Container>
			<Row>
				<Col md={6} className='new-product__form--container'>
					<Form style={{ width: '100%' }} onSubmit={handleSubmit}>
						<h1 className='mt-4'>Create a Category</h1>
						{isSuccess && (
							<Alert variant='success'>Category created with succcess</Alert>
						)}
						{isError && <Alert variant='danger'>{error.data}</Alert>}
						<Form.Group className='mb-3'>
							<Form.Label>Category name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category name'
								value={name}
								required
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Button type='button' onClick={showWidget}>
								Upload Images
							</Button>
							<div className='images-preview-container'>
								{images.map((image) => (
									<div className='image-preview'>
										<img src={image.url} />
									</div>
								))}
							</div>
						</Form.Group>

						<Form.Group>
							<Button type='submit' disabled={isLoading || isSuccess}>
								Create Category
							</Button>
						</Form.Group>
					</Form>
				</Col>
				{/* new-product__image--container */}
				<Col md={6} className=''>
					{fifthBan && (
						<img
							src={fifthBan?.pictures[0].url}
							className='firstImg home-banner'
							alt=''
						/>
					)}
				</Col>
			</Row>
		</Container>
	);
}

export default NewCategory;
