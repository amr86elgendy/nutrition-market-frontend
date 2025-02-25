import { z } from 'zod';

export const registerSchema = z.object({
	firstName: z.string().min(1, { message: 'First Name is required' }),
	lastName: z.string().min(1, { message: 'Last Name is required' }),
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, { message: 'Password is required' })
		.min(6, { message: 'Password must be greater than 6 characters' }),
});

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, { message: 'Password is required' })
		.min(6, { message: 'Password must be greater than 6 characters' }),
	from: z.string().nullable(),
});

export const forgotPasswordSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
	password: z.string().min(1, { message: 'Password is required' }),
	confirmPassword: z
		.string()
		.min(1, { message: 'Confirm password is required' }),
	token: z.string().min(1, {
		message: 'Token is required',
	}),
});
