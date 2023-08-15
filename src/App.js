import { useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Navigation, ScrollToTop } from './components/ComponentImport';

import {
	Home,
	Login,
	Signup,
	Product,
	Category,
	Cart,
	Orders,
	AdminDashboard,
	EditBanner,
	EditProduct,
	NewCategory,
	NewProduct,
} from './pages/PageImport';

import { addNotification } from './features/userSlice';

function App() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		const socket = io('ws://localhost:1035');
		socket.off('notification').on(
			'notification',
			(msgObj, user_id) => {
				// logic for notification
				if (user_id === user._id) {
					dispatch(addNotification(msgObj));
				}
			},
			[]
		);

		socket.off('new-order').on('new-order', (msgObj) => {
			if (user.isAdmin) {
				dispatch(addNotification(msgObj));
			}
		});
	}, []);

	return (
		<div className='App'>
			<BrowserRouter>
				<ScrollToTop />
				{/* <Announcement /> */}
				<Navigation />
				<Routes>
					<Route index element={<Home />} />
					{/* where user can access based on his role */}
					{/* not signed up */}
					{!user && (
						<>
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<Signup />} />
						</>
					)}

					{/* signed up as user */}
					{user && !user.isAdmin && (
						<>
							<Route path='/cart' element={<Cart />} />
							<Route path='/orders' element={<Orders />} />
						</>
					)}

					{/* signed up as admin */}
					{user && user.isAdmin && (
						<>
							<Route path='/admin' element={<AdminDashboard />} />
							<Route path='/banner/:id/edit' element={<EditBanner />} />
							<Route path='/product/:id/edit' element={<EditProduct />} />
							<Route path='/new-product' element={<NewProduct />} />
							<Route path='/new-category' element={<NewCategory />} />
						</>
					)}

					{/* for every */}
					<Route path='/product/:id' element={<Product />} />

					<Route path='/category/:category' element={<Category />} />

					<Route path='*' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
