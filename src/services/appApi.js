import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// creating API....
export const appApi = createApi({
	reducerPath: 'appApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1035' }),
	endpoints: (builder) => ({
		// USER
		// sign up
		signup: builder.mutation({
			query: (user) => ({
				url: '/users/signup',
				method: 'POST',
				body: user,
			}),
		}),

		// login
		login: builder.mutation({
			query: (user) => ({
				url: '/users/login',
				method: 'POST',
				body: user,
			}),
		}),

		// CATEGORY
		// create category
		createCategory: builder.mutation({
			query: (category) => ({
				url: '/categories',
				body: category,
				method: 'POST',
			}),
		}),

		// delete category
		deleteCategory: builder.mutation({
			query: ({ category_id, user_id }) => ({
				url: `/categories/${category_id}`,
				body: { user_id },
				method: 'DELETE',
			}),
		}),

		// update category
		updateCategory: builder.mutation({
			query: (category) => ({
				url: `/categories/${category.id}`,
				body: category,
				method: 'PATCH',
			}),
		}),

		// PRODUCT
		// create product
		createProduct: builder.mutation({
			query: (product) => ({
				url: '/products',
				body: product,
				method: 'POST',
			}),
		}),

		// delete product
		deleteProduct: builder.mutation({
			query: ({ product_id, user_id }) => ({
				url: `/products/${product_id}`,
				body: { user_id },
				method: 'DELETE',
			}),
		}),

		// update product
		updateProduct: builder.mutation({
			query: (product) => ({
				url: `/products/${product.id}`,
				body: product,
				method: 'PATCH',
			}),
		}),

		// CART
		// add to cart
		addToCart: builder.mutation({
			query: (cartInfo) => ({
				url: '/products/add-to-cart',
				body: cartInfo,
				method: 'POST',
			}),
		}),

		// remove from cart
		removeFromCart: builder.mutation({
			query: (body) => ({
				url: '/products/remove-from-cart',
				body,
				method: 'DELETE',
			}),
		}),

		// increase cart
		increaseCartProduct: builder.mutation({
			query: (body) => ({
				url: '/products/increase-cart',
				body,
				method: 'POST',
			}),
		}),

		// decrease cart
		decreaseCartProduct: builder.mutation({
			query: (body) => ({
				url: '/products/decrease-cart',
				body,
				method: 'POST',
			}),
		}),

		// ORDER
		// create order
		createOrder: builder.mutation({
			query: (body) => ({
				url: '/orders',
				method: 'POST',
				body,
			}),
		}),

		// BANNER
		// update
		updateBanner: builder.mutation({
			query: (banner) => ({
				url: `/banners/${banner.id}`,
				body: banner,
				method: 'PATCH',
			}),
		}),
	}),
});

export const {
	useSignupMutation,
	useLoginMutation,

	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,

	useCreateProductMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,

	useAddToCartMutation,
	useRemoveFromCartMutation,

	useIncreaseCartProductMutation,
	useDecreaseCartProductMutation,

	useCreateOrderMutation,

	useUpdateBannerMutation,
} = appApi;

export default appApi;
