'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { request } from 'apis/request';
import type { TReview } from 'features/reviews/types/review';
import { actionClient } from 'apis/action-clients';
import { flattenValidationErrors } from 'next-safe-action';

type TGetReviewsReturn = {
	reviews: TReview[];
	totalCount: number;
	currentPage: number;
	lastPage: number;
};

export const getReviews = async ({
	productId,
}: {
	productId: string;
}): Promise<TGetReviewsReturn> => {
	const data = await request({
		url: `/products/${productId}/reviews`,
	});

	return data;
};
export const getProductReviewsDetails = async ({
	productId,
}: {
	productId: string;
}): Promise<{
	ratingCounts: Record<'1' | '2' | '3' | '4' | '5', number>;
}> => {
	const data = await request({
		url: `/reviews/${productId}/details`,
	});

	return data;
};

export const getSingleReview = async ({ reviewId }: { reviewId: string }) => {
	const data = await request({
		url: `/reviews/${reviewId}`,
	});

	return data;
};

// ################################################
const addReviewSchema = z.object({
	productId: z.string().min(1, 'ProductId is required'),
	rating: z.number().min(1, 'Rating is required').max(5, 'max Rating is 5'),
	title: z.string().min(1, 'Review title is required'),
	comment: z.string().min(1, {
		message: 'Comment is required',
	}),
});

export const addReview = actionClient
	.metadata({ actionName: 'add-review-action' })
	.schema(addReviewSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: { productId, ...rest } }) => {
			const data = await request({
				url: `/reviews`,
				method: 'POST',
				body: {
					product: productId,
					...rest,
				},
			});
			return data;
		},
		{ onSettled: () => revalidatePath('/shop/[slug]', 'page') }
	);

// ############################################################
const updateReviewSchema = z.object({
	reviewId: z.string().min(1, 'ReviewId is required'),
	rating: z.number().min(1, 'Rating is required').max(5, 'max Rating is 5'),
	title: z.string().min(1, 'Review title is required'),
	comment: z.string().min(1, {
		message: 'Comment is required',
	}),
});

export const updateReview = actionClient
	.metadata({
		actionName: 'update-review-action',
	})
	.schema(updateReviewSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: { reviewId, ...rest } }) => {
			const data = await request({
				url: `/reviews/${reviewId}`,
				method: 'PATCH',
				body: {
					...rest,
				},
			});
			return data;
		},
		{ onSettled: () => revalidatePath('/shop/[slug]', 'page') }
	);

// ######################################################
const deleteReviewSchema = z.object({
	reviewId: z.string().min(1, 'ReviewId is required'),
});

export const deleteReview = actionClient
	.metadata({
		actionName: 'delete-review-action',
	})
	.schema(deleteReviewSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: { reviewId } }) => {
			const data = await request({
				url: `/reviews/${reviewId}`,
				method: 'DELETE',
			});
			return data;
		},
		{ onSettled: () => revalidatePath('/shop/[slug]', 'page') }
	);
