'use server';

import { request } from 'apis/request';
import type {
	TCategory,
	TGetCategoriesReturn,
	TGetTopSellingCategoriesReturn,
} from 'features/products/types/category';

export const getCategories = async (): Promise<TGetCategoriesReturn> => {
	const data = await request({
		url: `/categories`,
		method: 'GET',
	});

	return data;
};

export const getTopSellingCategories = async (props?: {
	limit: number;
}): Promise<TGetTopSellingCategoriesReturn> => {
	const data = await request({
		url: `/statistics/top-selling-categories`,
		method: 'GET',
		query: { limit: props?.limit },
	});

	return data;
};

export const getSingleCategory = async ({
	slug,
}: {
	slug: string;
}): Promise<{ category: TCategory }> => {
	const data = await request({
		url: `/categories/slug/${slug}`,
		method: 'GET',
	});

	return data;
};
