import React from 'react';
import Image from 'next/image';
import noReviewFound from 'assets/no-review-found.svg';

import { Comment } from 'features/reviews/components/comment';
import { getReviews } from 'features/reviews/apis/reviews';
import { getMe } from 'features/auth/apis/user';
import type { TProductWithSingleVariant } from 'features/products/types/product';

export async function ReviewsList({
	productId,
}: {
	productId: TProductWithSingleVariant['_id'];
}) {
	const user = await getMe();
	const { reviews, totalCount } = await getReviews({ productId });

	if (!totalCount) {
		return (
			<div className='flex h-full flex-col items-center justify-center gap-4'>
				<Image
					width={500}
					height={500}
					src={noReviewFound}
					className='w-[8%]'
					alt='No reviews on this product'
				/>
				<h1 className='text-center text-gray-800'>
					No reviews on this product
				</h1>
			</div>
		);
	}

	return (
		<ul className='flex flex-col gap-4 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-50'>
			{reviews?.map(review => (
				<Comment
					currentUserId={user?._id}
					key={review._id}
					{...review}
				/>
			))}
		</ul>
	);
}
