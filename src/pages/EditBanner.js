import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateBannerMutation } from '../services/appApi';
import axios from '../axios';
import './NewProduct.css';

function EditBanner() {
	const { id } = useParams();
	const [images, setImages] = useState([]);
	const [imgToRemove, setImgToRemove] = useState(null);

	const [updateBanner, { isError, error, isLoading, isSuccess }] =
		useUpdateBannerMutation();

	const [banners, setBanners] = useState([]);
	const fifthBan = banners[4];

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get('http://localhost:1035/banners')
			.then(({ data }) => {
				setBanners(data);
			})
			.catch((e) => {
				console.log(e);
			});

		axios
			.get('/banners/' + id)
			.then(({ data }) => {
				const banner = data.banner;
				setImages(banner.pictures);
			})
			.catch((e) => console.log(e));
	}, [id]);

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
		if (!images.length) {
			return alert('Please fill out all the fields');
		}
		updateBanner({ id, images }).then(({ data }) => {
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
				cloudName: 'Cloudghady',
				uploadPreset: 'y8oofxvv',
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
						<h1 className='mt-4'>Edit Banner</h1>
						{isSuccess && <Alert variant='success'>Banner Updated</Alert>}
						{isError && <Alert variant='danger'>{error.data}</Alert>}

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
								Update Banner
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

export default EditBanner;
