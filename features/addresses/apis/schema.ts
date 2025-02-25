import { z } from 'zod';

export const addressSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
	phone: z
		.string()
		.min(1, 'Phone is required')
		.length(11, 'Invalid phone number')
		.regex(/^[0-9]+$/, 'accepts only numbers'),
	additionalPhone: z
		.string()
		.min(1, 'Additional phone is required')
		.length(11, 'Invalid phone number')
		.regex(/^[0-9]+$/, 'accepts only numbers'),
	governorate: z.string().min(1, 'Governorate is required'),
	city: z.string().min(1, 'City is required'),
	street: z.string().min(1, 'Street is required'),
	buildingNo: z.string().min(1, 'Building number is required'),
	floor: z.string().optional(),
});
