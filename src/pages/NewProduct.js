import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateProductMutation } from '../services/appApi';
import axios from '../axios';
import './NewProduct.css';
import { useSelector } from 'react-redux';

function NewProduct() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [category, setCategory] = useState('');
	const [images, setImages] = useState([]);
	const [imgToRemove, setImgToRemove] = useState(null);
	const navigate = useNavigate();
	const [createProduct, { isError, error, isLoading, isSuccess }] =
		useCreateProductMutation();

	const categories = useSelector((state) => state.categories);

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

	function handleRemoveImg(imgObj) {
		setImgToRemove(imgObj.public_id);
		axios
			.delete(`/images/${imgObj.public_id}/`)
			.then((res) => {
				setImgToRemove(null);
				setImages((prev) =>
					prev.filter((img) => img.public_id !== imgObj.public_id)
				);
			})
			.catch((e) => console.log(e));
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!name || !description || !price || !category || !images.length) {
			return alert('Please fill out all the fields');
		}
		createProduct({ name, description, price, category, images }).then(
			({ data }) => {
				if (data.length > 0) {
					setTimeout(() => {
						navigate('/');
					}, 1500);
				}
			}
		);
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
						<h1 className='mt-4'>Create a product</h1>
						{isSuccess && (
							<Alert variant='success'>Product created with succcess</Alert>
						)}
						{isError && <Alert variant='danger'>{error.data}</Alert>}
						<Form.Group className='mb-3'>
							<Form.Label>Product name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter product name'
								value={name}
								required
								onChange={(e) => setName(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>Product description</Form.Label>
							<Form.Control
								as='textarea'
								placeholder='Product description'
								style={{ height: '100px' }}
								value={description}
								required
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Form.Label>Price($)</Form.Label>
							<Form.Control
								type='number'
								placeholder='Price ($)'
								value={price}
								required
								onChange={(e) => setPrice(e.target.value)}
							/>
						</Form.Group>

						<Form.Group
							className='mb-3'
							onChange={(e) => setCategory(e.target.value)}
						>
							<Form.Label>Category</Form.Label>
							<Form.Select>
								<option disabled selected>
									-- Select One --
								</option>
								{/* <option value='women'>Women</option>
								<option value='kids'>Kids</option>
								<option value='men'>Men</option> */}
								{categories.map((category) => (
									<option value={category.name}>{category.name}</option>
								))}
							</Form.Select>
						</Form.Group>

						<Form.Group className='mb-3'>
							<Button type='button' onClick={showWidget}>
								Upload Images
							</Button>
							<div className='images-preview-container'>
								{images.map((image) => (
									<div className='image-preview'>
										<img src={image.url} />
										{imgToRemove !== image.public_id && (
											<i
												className='fa fa-times-circle'
												onClick={() => handleRemoveImg(image)}
											></i>
										)}
									</div>
								))}
							</div>
						</Form.Group>

						<Form.Group>
							<Button type='submit' disabled={isLoading || isSuccess}>
								Create Product
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

export default NewProduct;
