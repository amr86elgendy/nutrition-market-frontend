'use server';

import { request } from 'apis/request';
import { TDosageForm } from 'features/products/types/dosage-form';

export const getDosageForms = async (): Promise<{
	dosageForms: TDosageForm[];
}> => {
	const data = await request({
		url: `/dosage-forms`,
		method: 'GET',
	});

	return data;
};
