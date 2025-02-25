'use server';

import { cookies } from 'next/headers';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';
import { getLocale } from 'next-intl/server';
import { redirect } from 'i18n/routing';

import { actionClient } from 'apis/action-clients';
import { ACCESS_COOKIE_OPTIONS, REFRESH_COOKIE_OPTIONS } from 'constants/auth';
import { request } from 'apis/request';
import {
	forgotPasswordSchema,
	loginSchema,
	registerSchema,
	resetPasswordSchema,
} from './schema';

export const login = actionClient
	.metadata({ actionName: 'login-action' })
	.schema(loginSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: userData }) => {
			const data = await request({
				url: '/auth/login',
				body: userData,
				method: 'POST',
			});
			cookies().set(
				process.env.ACCESS_TOKEN_NAME ?? '',
				data.accessToken,
				ACCESS_COOKIE_OPTIONS
			);

			cookies().set(
				process.env.REFRESH_TOKEN_NAME ?? '',
				data.refreshToken,
				REFRESH_COOKIE_OPTIONS
			);
			cookies().delete(process.env.CART_ID ?? '');
			return data;
		},
		{
			onSuccess: async data => {
				if (!data.hasRedirected) {
					const locale = await getLocale();
					redirect({ locale, href: data.parsedInput.from ?? '/' });
				}
			},
		}
	);

export const register = actionClient
	.metadata({ actionName: 'register-action' })
	.schema(registerSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: userData }) => {
		await request({
			url: '/auth/register',
			body: userData,
			method: 'POST',
		});
	});

const otpSchema = z.object({
	otp: z.string().min(1, { message: 'Otp is required' }),
});

export const verifyEmail = actionClient
	.metadata({ actionName: 'verifiy-email-action' })
	.schema(otpSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: { otp } }) => {
			const data = await request({
				url: '/auth/verify-email',
				body: { otp },
				method: 'POST',
			});

			cookies().set(
				process.env.ACCESS_TOKEN_NAME ?? '',
				data.accessToken,
				ACCESS_COOKIE_OPTIONS
			);

			cookies().set(
				process.env.REFRESH_TOKEN_NAME ?? '',
				data.refreshToken,
				REFRESH_COOKIE_OPTIONS
			);

			cookies().delete(process.env.CART_ID ?? '');
			return data;
		},
		{
			onSuccess: async () => {
				const locale = await getLocale();
				redirect({ locale, href: `/` });
			},
		}
	);

export const logout = actionClient
	.metadata({ actionName: 'logout-action' })
	.action(
		async () => {
			await request({ url: '/auth/logout' });
			cookies().delete(process.env.ACCESS_TOKEN_NAME ?? '');
			cookies().delete(process.env.REFRESH_TOKEN_NAME ?? '');
		},
		{
			onSuccess: async () => {
				const locale = await getLocale();
				redirect({ locale, href: '/' });
			},
		}
	);

export const refreshAccessTokenFn = async () => {
	try {
		const data = await request({ url: '/auth/refresh', method: 'GET' });
		return data;
	} catch {
		logout();
	}
};

export const forgotPassword = actionClient
	.metadata({ actionName: 'forgot-password-action' })
	.schema(forgotPasswordSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: userData }): Promise<{ msg: string }> => {
		const data = await request({
			url: '/auth/forgot-password',
			body: userData,
			method: 'POST',
		});
		return data;
	});

export const getUserForOtp = async ({
	id,
}: {
	id: string;
}): Promise<{ email: string }> => {
	const { user } = await request({
		url: `/users/verify-email/${id}`,
	});

	return user;
};

export const resetPassword = actionClient
	.metadata({ actionName: 'reset-password-action' })
	.schema(resetPasswordSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({
			parsedInput: { token, ...userData },
		}): Promise<{ msg: string }> => {
			const data = await request({
				url: `/auth/reset-password/${token}`,
				body: userData,
				method: 'PATCH',
			});
			return data;
		}
	);

export const loginWithGoogle = actionClient
	.metadata({ actionName: 'login-with-google-action' })
	.action(async () => {
		const { url } = await request({ url: '/auth/google' });
		const locale = await getLocale();
		redirect({ locale, href: url });
	});
