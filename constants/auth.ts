import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const UNAUTHENTICATED_ROUTES = [
	'/login',
	'/forgot-password',
	'/signup',
	'/reset-password',
];

export const PRIVATE_ROUTES = ['/checkout', '/orders'];

export const ACCESS_COOKIE_OPTIONS: Partial<ResponseCookie> = {
	httpOnly: true,
	sameSite: 'lax',
	secure: false,
	maxAge: 60 * 30,
};

export const REFRESH_COOKIE_OPTIONS: Partial<ResponseCookie> = {
	httpOnly: true,
	sameSite: 'strict',
	secure: false,
	maxAge: 60 * 60 * 24,
};
