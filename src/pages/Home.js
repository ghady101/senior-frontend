import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from '../features/productSlice';
import { ProductPreview } from '../components/ComponentImport';
import { createCategories } from '../features/categorySlice';

function Home() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);

	// 1
	const [banners, setBanners] = useState([]);
	// const [firstBan, SecondBan] = banners;
	const firstBan = banners[0];
	const SecondBan = banners[1];

	// 2
	const categories = useSelector((state) => state.categories);

	const lastProducts = products.slice(0, 8);

	useEffect(() => {
		// 1
		axios
			.get('/banners')
			.then(({ data }) => {
				setBanners(data);
				console.log(data);
			})
			.catch((e) => {
				console.log(e);
			});

		// 2
		axios
			.get('/categories')
			.then(({ data }) => dispatch(createCategories(data)));
		axios.get('/products').then(({ data }) => dispatch(updateProducts(data)));
	}, []);

	return (
		<div>
			{firstBan && (
				<img
					src={firstBan?.pictures[0].url}
					className='firstImg home-banner'
					alt=''
				/>
			)}

			{/* <img src='/pics/Home/1.jpg' className='firstImg home-banner' alt='' /> */}
			{/* last product */}
			<div className='featured-products-container mt-4'>
				<h2>Last Products</h2>
				<div className='d-flex justify-content-center flex-wrap'>
					{lastProducts.map((product) => (
						<ProductPreview {...product} />
					))}
				</div>
				<div>
					<Link
						to='/category/all'
						style={{
							textAlign: 'right',
							display: 'block',
							textDecoration: 'none',
						}}
					>
						See more {'>>'}
					</Link>
				</div>
			</div>
			{/* banner */}
			<div className='sale_banner--container'>
				{SecondBan && (
					<img
						src={SecondBan?.pictures[0].url}
						className='firstImg home-banner'
						alt=''
					/>
				)}
				{/* <img src='/pics/Home/2.jpg' className='firstImg' alt='' /> */}
			</div>
			<div className='recent-products-container container mt-4'>
				<h2>Categories</h2>
				<Row className='mb-4'>
					{categories.map((category) => (
						<LinkContainer
							to={`/category/${category.name.toLocaleLowerCase()}`}
						>
							<Col md={4}>
								<div
									style={{
										// IMAGE TO FIX
										backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.pictures[0].url})`,
										gap: '10px',
									}}
									className='category-tile'
								>
									{category.name}
								</div>
							</Col>
						</LinkContainer>
					))}
				</Row>
			</div>
		</div>
	);
}

export default Home;
