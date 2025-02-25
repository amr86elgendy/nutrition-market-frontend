'use server';

import { request } from 'apis/request';
import type {
	TGetCompaniesReturn,
	TCompany,
} from 'features/products/types/company';

export const getCompanies = async (): Promise<TGetCompaniesReturn> => {
	const data = await request({
		url: `/companies`,
		method: 'GET',
	});

	return data;
};

export const getPopularCompanies = async (props?: {
	limit: number;
}): Promise<TGetCompaniesReturn> => {
	const data = await request({
		url: `/companies/popular`,
		method: 'GET',
		query: { limit: props?.limit },
	});

	return data;
};

export const getSingleCompany = async ({
	slug,
}: {
	slug: string;
}): Promise<{ company: TCompany }> => {
	const data = await request({
		url: `/companies/slug/${slug}`,
		method: 'GET',
	});

	return data;
};

export const getPopularCompaniens = async (): Promise<TGetCompaniesReturn> => {
	const data = await request({
		url: `/companies/popular`,
		method: 'GET',
	});

	return data;
};
