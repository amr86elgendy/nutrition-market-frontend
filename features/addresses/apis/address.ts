'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';
import { actionClient } from 'apis/action-clients';
import { request } from 'apis/request';
import type { TAddress } from 'features/addresses/types/address';
import { TTags } from 'constants/revalidate-tags';
import { addressSchema } from './schema';

export const getUserAddresses = async (): Promise<TAddress[]> => {
	const data = await request({
		url: '/addresses',
		method: 'GET',
		next: { tags: [TTags.addresses] },
	});
	return data.addresses;
};

export const addAddress = actionClient
	.metadata({ actionName: 'add-address-action' })
	.schema(addressSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action<{ address: TAddress }>(
		async ({ parsedInput: addressData }) => {
			const data = await request({
				url: '/addresses',
				body: {
					...addressData,
				},
				method: 'POST',
			});
			return data;
		},
		{ onSettled: () => revalidateTag(TTags.addresses) }
	);

const updateAddressSchema = z
	.object({
		firstName: z.string(),
		lastName: z.string(),
		email: z.string().email('Please enter a valid email address'),
		phone: z.string(),
		additionalPhone: z.string(),
		governorate: z.string(),
		city: z.string(),
		street: z.string(),
		buildingNo: z.string(),
		floor: z.string(),
	})
	.partial()
	.extend({ addressId: z.string().min(1, 'Please provide address id') });
export const updateAddress = actionClient
	.metadata({ actionName: 'update-address-action' })
	.schema(updateAddressSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: { addressId, ...addressDate } }) => {
			const data = await request({
				url: `/addresses/${addressId}`,
				body: {
					...addressDate,
				},
				method: 'PATCH',
			});
			return data;
		},
		{ onSettled: () => revalidateTag(TTags.addresses) }
	);
