import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from '../axios';
import { Loading } from './ComponentImport';

import { useSelector } from 'react-redux';
import { useDeleteCategoryMutation } from '../services/appApi';
import { Link } from 'react-router-dom';

function DashboardCategories() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get('/categories')
			.then(({ data }) => {
				setLoading(false);
				setCategories(data);
			})
			.catch((e) => {
				setLoading(false);
				console.log(e);
			});
	}, []);

	const user = useSelector((state) => state.user);

	const [deleteCategory, { isLoading, isSuccess }] =
		useDeleteCategoryMutation();

	function handleDeleteCategory(id) {
		// logic here
		if (window.confirm('Are you sure?'))
			deleteCategory({ category_id: id, user_id: user._id });
	}

	if (loading) return <Loading />;
	if (categories?.length === 0)
		return <h2 className='py-2 text-center'>No categories yet</h2>;

	return (
		<Table responsive striped bordered hover>
			<thead>
				<tr>
					<th></th>
					<th>Category Id</th>
					<th>Category Name</th>
				</tr>
			</thead>
			<tbody>
				{categories.map((category) => (
					<tr>
						<td>
							<img
								src={category.pictures[0].url}
								className='dashboard-product-preview'
								alt=''
							/>
						</td>
						<td>{category._id}</td>
						<td>{category.name}</td>
						<td>
							<Button
								onClick={() => handleDeleteCategory(category._id, user._id)}
								disabled={isLoading}
							>
								Delete
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default DashboardCategories;
