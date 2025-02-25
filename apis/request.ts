'use server';

import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getAccessToken } from './helpers';
import qs from 'qs';

const baseURL = process.env.NEXT_PUBLIC_API_DEV_URL;

interface CustomError extends Error {
	cause: { statusCode: number };
}

type TOptions =
	| (Omit<RequestInit, 'body'> & {
			url: `/${string}`;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			body?: number | string | { [x: string]: any };
			baseUrl?: string;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			query?: Record<string, any>;
	  })
	| undefined;

export const request = async ({ ...options }: TOptions) => {
	const accessToken = await getAccessToken();

	const queryString = qs.stringify(options.query, {
		addQueryPrefix: true,
		allowEmptyArrays: true,
		skipNulls: true,
	});

	const defaultHeaders = {
		...(accessToken && {
			Authorization: `Bearer ${accessToken}`,
		}),
		cookie: cookies().toString(),
		'Content-Type': 'application/json',
		...(process.env.NEXT_PUBLIC_API_KEY && {
			'api-key': process.env.NEXT_PUBLIC_API_KEY,
		}),
	};

	const finalBaseUrl = options.baseUrl ?? baseURL;

	const res = await fetch(`${finalBaseUrl}${options.url}${queryString}`, {
		credentials: 'include',
		...options,

		headers: { ...defaultHeaders, ...options.headers },
		body: options.body ? JSON.stringify(options.body) : undefined,
	});

	if (res.redirected) {
		redirect(res.url);
	}

	try {
		if (!res.ok) {
			const data = await res.json();
			throw new Error(data.msg, { cause: { statusCode: res.status } });
		}

		return await res.json();
	} catch (err) {
		const error = err as CustomError;
		if (error?.cause?.statusCode === 404) {
			notFound();
		}
		throw new Error(error.message);
	}
};
