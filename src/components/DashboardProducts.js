import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './DashboardProducts.css';
import { useDeleteProductMutation } from '../services/appApi';

function DashboardProducts() {
	const products = useSelector((state) => state.products);
	const user = useSelector((state) => state.user);

	const [deletProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

	function handleDeleteProduct(id) {
		// logic here
		if (window.confirm('Are you sure?'))
			deletProduct({ product_id: id, user_id: user._id });
	}

	if (products.length === 0) {
		return <h1 className='text-center pt-4'>No products yet</h1>;
	}
	return (
		<Table striped bordered hover responsive>
			<thead>
				<tr>
					<th></th>
					<th>Product Id</th>
					<th>Product Name</th>
					<th>Product Price</th>
				</tr>
			</thead>
			<tbody>
				{products.map((product) => (
					<tr>
						<td>
							<img
								src={product.pictures[0].url}
								className='dashboard-product-preview'
								alt=''
							/>
						</td>
						<td>{product._id}</td>
						<td>{product.name}</td>
						<td>{product.price}</td>
						<td>
							<Button
								onClick={() => handleDeleteProduct(product._id, user._id)}
								disabled={isLoading}
							>
								Delete
							</Button>
							<Link
								to={`/product/${product._id}/edit`}
								className='btn btn-warning'
							>
								Edit
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default DashboardProducts;
