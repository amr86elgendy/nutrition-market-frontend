'use server';

import { actionClient } from 'apis/action-clients';
import { request } from 'apis/request';
import { revalidateTag } from 'next/cache';
import { TTags } from 'constants/revalidate-tags';
import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';

const paySchema = z.object({
	cartId: z.string().min(1, 'Cart id is required'),
	addressId: z.string().min(1, 'Address id is required'),
	paymentMethodId: z.string().optional(),
});

export const payOnline = actionClient
	.metadata({ actionName: 'pay-online-action' })
	.schema(paySchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { addressId, cartId, paymentMethodId } }) => {
		const data = await request({
			method: 'POST',
			url: '/payment',
			body: {
				cartId,
				addressId,
				paymentMethodId,
			},
		});

		return data;
	});
export const payCash = actionClient
	.metadata({ actionName: 'pay-cash-action' })
	.schema(paySchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: { addressId, cartId } }) => {
			const data = await request({
				method: 'POST',
				url: '/orders/cash-on-delivery',
				body: {
					cartId,
					addressId,
				},
			});

			return data;
		},
		{
			onSettled: () => revalidateTag(TTags.cart),
		}
	);
