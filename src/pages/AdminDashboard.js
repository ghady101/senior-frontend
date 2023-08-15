import React from 'react';
import { Container, Nav, Tab, Col, Row } from 'react-bootstrap';
import {
	DashboardUsers,
	DashboardOrders,
	DashboardProducts,
	DashboardCategories,
	DashboardBanners,
} from '../components/ComponentImport';

function AdminDashboard() {
	return (
		<Container>
			<Tab.Container defaultActiveKey='products'>
				<Row>
					<Col sm={3}>
						<Nav variant='pills' className='flex-column'>
							<Nav.Item>
								<Nav.Link eventKey='products'>Products</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey='banners'>Banners</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey='categories'>Categories</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey='orders'>Orders</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link eventKey='clients'>Clients</Nav.Link>
							</Nav.Item>
						</Nav>
					</Col>
					<Col sm={9}>
						<Tab.Content>
							<Tab.Pane eventKey='products'>
								<DashboardProducts />
							</Tab.Pane>
							<Tab.Pane eventKey='banners'>
								<DashboardBanners />
							</Tab.Pane>
							<Tab.Pane eventKey='categories'>
								<DashboardCategories />
							</Tab.Pane>
							<Tab.Pane eventKey='orders'>
								<DashboardOrders />
							</Tab.Pane>
							<Tab.Pane eventKey='clients'>
								<DashboardUsers />
							</Tab.Pane>
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
		</Container>
	);
}

export default AdminDashboard;
