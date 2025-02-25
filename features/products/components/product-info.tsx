import { RatingStars } from 'components/ui/rating-stars';
import { Separator } from 'components/ui/separator';
import Link from 'next/link';

export function ProductInfo({
	averageRating,
	numReviews,
	companySlug,
	companyName,
	NFSA_REG_NO,
}: {
	averageRating: number;
	numReviews: number;
	companySlug: string;
	companyName: string;
	NFSA_REG_NO: string;
}) {
	return (
		<div className='typography-R14 mb-2 flex items-center gap-2 text-gray-200'>
			<RatingStars averageRating={averageRating} />

			<span className='typography-R14 rounded-md border border-gray-50 px-1'>
				{numReviews}
			</span>

			<Separator
				orientation='vertical'
				className='mx-2 h-4'
			/>

			<p>
				Store:{' '}
				<Link
					href={`/companies/${companySlug}`}
					className='typography-SB13 text-green-500 underline'>
					{companyName}
				</Link>
			</p>

			<Separator
				orientation='vertical'
				className='mx-2 h-4'
			/>

			<p>
				SKU: <span className='typography-SB13'>{NFSA_REG_NO}</span>
			</p>
		</div>
	);
}
