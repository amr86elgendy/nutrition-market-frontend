import { actionClient } from 'apis/action-clients';
import { request } from 'apis/request';
import type { TCity, TGovernorate } from 'features/addresses/types/egypt';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';

export const getGovernorates = async (): Promise<TGovernorate[]> => {
	const data = await request({
		url: '/governorates',
		method: 'GET',
	});
	return data.governorates;
};

const getCitiesSchema = z.object({
	govId: z.string().min(1, 'govId is required'),
});

export const getCities = actionClient
	.metadata({ actionName: 'get-cities-action' })
	.schema(getCitiesSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: { govId } }) => {
		const data = await request({
			url: `/cities/${govId}`,
			method: 'GET',
			cache: 'force-cache',
		});

		return data.cities as TCity[];
	});
