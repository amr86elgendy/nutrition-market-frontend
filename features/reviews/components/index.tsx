import { StarIcon } from 'lucide-react';
import { Progress } from 'components/ui/progress';
import { CircleProgress } from 'components/ui/circle-progress';

import { RatingStars } from 'components/ui/rating-stars';

import { AddForm } from 'features/reviews/components/forms/add-form';
import { ReviewsList } from 'features/reviews/components/list';

import {
	getProductReviewsDetails,
	getReviews,
} from 'features/reviews/apis/reviews';
import { getMe } from 'features/auth/apis/user';

import type { TProductWithSingleVariant } from 'features/products/types/product';

export default async function Reviews({
	_id: productId,
	slug: productSlug,
	averageRating,
}: Pick<TProductWithSingleVariant, '_id' | 'slug' | 'averageRating'>) {
	const ratingPrecentage = (averageRating / 5) * 100;

	const { reviews, totalCount } = await getReviews({ productId });
	const user = await getMe();

	const { ratingCounts } = await getProductReviewsDetails({ productId });

	const hasUserReview = reviews.some(review => review.user._id === user?._id);

	return (
		<section>
			<h3 className='typography-M16 mb-6'>What Others Are Saying</h3>

			<div className='media-md:grid grid-cols-[1fr_2fr] gap-4'>
				<article className='media-md:flex media-md:flex-col hidden gap-y-6 self-start rounded-lg border border-gray-50 p-4'>
					<div className='flex items-center gap-2'>
						<CircleProgress
							circleSize={72}
							precentage={ratingPrecentage}
							strokeWidth={4}>
							<span className='typography-SB16'>
								{averageRating.toFixed(1)}
							</span>
						</CircleProgress>
						<div className='flex flex-col gap-2'>
							<RatingStars averageRating={averageRating} />
							{totalCount ? (
								<p className='typography-R14'>From {totalCount} reviews</p>
							) : (
								<p className='typography-R14'>No reviews yet.</p>
							)}
						</div>
					</div>

					<div className='w-10/12 space-y-2'>
						{Object.entries(ratingCounts).map(([key, val]) => {
							const num = (val * 100) / (totalCount || 1);
							const percentage = Math.floor(num) !== num ? num.toFixed(1) : num;
							return (
								<div
									key={key}
									className='grid grid-cols-[12px_15px_1fr_20px] items-center gap-x-1'>
									<p>{key}</p>
									<StarIcon
										fill='currentColor'
										className='text-orange-400'
										size={16}
									/>
									<Progress
										className='ms-4 h-1 text-red-500'
										value={+percentage}
									/>
									<p className='typography-SB13 ms-4'>{percentage}%</p>
								</div>
							);
						})}
					</div>

					<AddForm
						hasUserReview={hasUserReview}
						user={user}
						productId={productId}
						productSlug={productSlug}
					/>
				</article>

				<ReviewsList productId={productId} />
			</div>
		</section>
	);
}
