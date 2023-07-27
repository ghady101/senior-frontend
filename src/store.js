import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import productSlice from './features/productSlice';
import categorySlice from './features/categorySlice';
import appApi from './services/appApi';

//persit our store
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// when refresh or close we still hae the account (user) logged in and his products

// reducers
const reducer = combineReducers({
	user: userSlice,
	products: productSlice,
	categories: categorySlice,
	[appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
	key: 'root',
	storage,
	blackList: [appApi.reducerPath, 'products'],
};

// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store
const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk, appApi.middleware],
});

export default store;
