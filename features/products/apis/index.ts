'use server';

import { request } from 'apis/request';
import type {
	TProductWithMultipleVariants,
	TProductWithSingleVariant,
} from 'features/products/types/product';
import { TParams } from 'types/searchparams';

type TGetProductsReturn = {
	currentPage: number;
	lastPage: number;
	products: TProductWithSingleVariant[];
	totalCount: number;
};

export const getProducts = async ({
	...params
}: Partial<TParams>): Promise<TGetProductsReturn> => {
	const data = await request({
		url: '/products',
		method: 'GET',
		query: params,
	});

	return data;
};

export type TSimilarProductsProps = {
	productId: string;
	limit?: number;
};

export const getSimilarProducts = async ({
	productId,
	limit = 5,
}: TSimilarProductsProps): Promise<Pick<TGetProductsReturn, 'products'>> => {
	const data = await request({
		url: `/products/${productId}/similar`,
		query: { limit },
		method: 'GET',
	});

	return data;
};

export const getSingleProduct = async ({
	productId,
}: {
	productId: string | undefined;
}): Promise<TProductWithMultipleVariants> => {
	const { product } = await request({
		url: `/products/${productId}`,
		method: 'GET',
	});
	return product;
};

export const getSingleProductBySlug = async ({
	slug,
}: {
	slug: string | undefined;
}): Promise<TProductWithMultipleVariants> => {
	const { product } = await request({
		url: `/products/slug/${slug}`,
		method: 'GET',
	});
	return product;
};

export const geProductReviews = async ({
	productId,
}: {
	productId: string | undefined;
}): Promise<Pick<TGetProductsReturn, 'products'>['products'][number]> => {
	const { product } = await request({
		url: `/products/${productId}`,
		method: 'GET',
	});
	return product;
};
