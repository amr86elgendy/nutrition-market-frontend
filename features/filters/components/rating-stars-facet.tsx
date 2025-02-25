'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from 'components/ui/button';
import { RatingStars } from 'components/ui/rating-stars';
import { Checkbox } from 'components/ui/checkbox';

export function RatingStarsFacet() {
	const router = useRouter();
	const searchParams = new URLSearchParams(useSearchParams());

	const t = useTranslations('Filter');

	const facetValue = searchParams.get('averageRating');

	return (
		<div className='space-y-4'>
			<div className='space-y-1'>
				{Array.from({ length: 5 }, (_, idx) => (idx + 1).toString())
					.reverse()
					.map(el => (
						<div
							key={el}
							className='typography-R13 has-data-[state=checked]:typography-SB13 flex items-center gap-2 text-gray-400 has-data-[state=checked]:text-black'>
							<Checkbox
								id={el}
								onCheckedChange={checked => {
									if (checked) {
										searchParams.set('averageRating', el);
									} else {
										searchParams.delete('averageRating');
									}
									if (searchParams.get('page')) {
										searchParams.set('page', '1');
									}
									router.push(`?${searchParams.toString()}`);
								}}
								checked={facetValue === el}
							/>
							<label
								htmlFor={el}
								className='inline-block cursor-pointer'>
								<RatingStars
									averageRating={+el}
									size={16}
								/>
							</label>
						</div>
					))}
			</div>
			{facetValue && (
				<Button
					variant='secondary-destructive'
					size='sm'
					className='w-full text-xs text-red-500'
					onClick={() => {
						searchParams.delete('averageRating');
						router.push(`?${searchParams.toString()}`);
					}}>
					{t('clear')}
				</Button>
			)}
		</div>
	);
}
