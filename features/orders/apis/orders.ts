'use server';

import { revalidateTag } from 'next/cache';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';

import { actionClient } from 'apis/action-clients';
import { request } from 'apis/request';
import type { TOrder } from 'features/orders/types/order';
import { TTags } from 'constants/revalidate-tags';

export const getAllOrders = async (): Promise<TOrder[]> => {
	const { orders } = await request({
		url: `/orders/my-orders`,
		method: 'GET',
	});
	return orders;
};

export const getSingleOrder = async ({
	orderId,
}: {
	orderId: string;
}): Promise<TOrder> => {
	const { order } = await request({
		url: `/orders/${orderId}`,
		method: 'GET',
		next: { tags: [TTags.order] },
	});
	return order;
};

const cancelOrderSchema = z.object({
	cancelReason: z.string().min(1, {
		message: 'Reason is required',
	}),
	orderId: z.string().min(1, {
		message: 'Order id is required',
	}),
});

export const cancelOrder = actionClient
	.metadata({ actionName: 'cancel-order-action' })
	.schema(cancelOrderSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: { cancelReason, orderId } }) => {
			const { order } = await request({
				url: `/orders/${orderId}`,
				method: 'POST',
				body: { cancelReason },
			});
			return order;
		},
		{
			onSuccess: () => revalidateTag(TTags.order),
		}
	);
