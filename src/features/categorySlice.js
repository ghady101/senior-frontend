import { createSlice } from '@reduxjs/toolkit';

//from appAPI
import appApi from '../services/appApi';

const initialState = [];

export const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		createCategories: (_, action) => {
			return action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			appApi.endpoints.createCategory.matchFulfilled,
			(_, { payload }) => payload
		);
		builder.addMatcher(
			appApi.endpoints.updateCategory.matchFulfilled,
			(_, { payload }) => payload
		);
		builder.addMatcher(
			appApi.endpoints.deleteCategory.matchFulfilled,
			(_, { payload }) => payload
		);
	},
});

export const { createCategories } = categorySlice.actions;
export default categorySlice.reducer;
