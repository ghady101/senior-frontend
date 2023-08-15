import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from '../axios';
import { Loading } from './ComponentImport';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DashboardBanner() {
	const [banners, setBanners] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get('/banners')
			.then(({ data }) => {
				setLoading(false);
				setBanners(data);
			})
			.catch((e) => {
				setLoading(false);
				console.log(e);
			});
	}, []);

	const user = useSelector((state) => state.user);

	if (loading) return <Loading />;
	if (banners?.length === 0)
		return <h2 className='py-2 text-center'>No banners yet</h2>;

	return (
		<Table responsive striped bordered hover>
			<thead>
				<tr>
					<th>Banner Image</th>
					<th>Banner Name</th>
					<th>Banner Edit</th>
				</tr>
			</thead>
			<tbody>
				{banners.map((ban) => (
					<tr>
						<td>
							<img
								src={ban.pictures[0].url}
								className='dashboard-product-preview'
								alt=''
							/>
						</td>
						<td>{ban.name}</td>
						<td>
							<Link to={`/banner/${ban._id}/edit`} className='btn btn-warning'>
								Edit
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default DashboardBanner;
