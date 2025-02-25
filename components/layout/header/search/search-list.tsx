import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import { TrendingCategory } from './trending-category';
import { Price } from 'components/utils/price';
import type { TProductWithSingleVariant } from 'features/products/types/product';

export const SearchList = forwardRef<
	HTMLUListElement,
	React.HTMLAttributes<HTMLUListElement> & {
		products?: TProductWithSingleVariant[];
		searchValue: string;
		debouncedValue: string;
		isPlaceholderData: boolean;
	}
>(({ products, searchValue, debouncedValue }, ref) => {
	const locale = useLocale();
	if (searchValue && !!products && products?.length === 0) {
		return (
			<div className='flex flex-col gap-2 bg-white p-4'>
				<span className='typography-R14'>
					No result found for{' '}
					<span className='typography-B14'>&quot;{debouncedValue}&quot;</span>
				</span>
			</div>
		);
	}

	if (searchValue && !!products && products?.length !== 0) {
		return (
			<ul
				ref={ref}
				className='start-0 z-50 mt-2 max-h-[400px] w-full overflow-auto bg-white text-base'>
				{products?.map(p => {
					return (
						<li
							key={p._id}
							className='hover:bg-gray-20 flex h-[100px] items-center rounded-xs p-2 transition-all select-none'>
							<Link
								className='flex w-full gap-2'
								href={`/shop/${p._id}?variant=${p.variants._id}`}>
								<div className='border-gray-40 aspect-square size-20 rounded-md border bg-white p-2'>
									<Image
										src={p.variants.images[0].url}
										alt=''
										width={300}
										height={300}
										className='aspect-square size-full object-contain mix-blend-multiply'
									/>
								</div>
								<div>
									<span className='typography-SB14 line-clamp-1 text-green-500'>
										{locale === 'ar' ? p.variants.name_ar : p.variants.name_en}
									</span>
									<Price
										finalPriceClassName='typography-M14'
										previousPriceClassName='typography-R12 text-gray-200'
										price={p.variants.price}
										priceAfterDiscount={p.variants.priceAfterDiscount}
									/>
								</div>
							</Link>
						</li>
					);
				})}
			</ul>
		);
	}
	return <TrendingCategory />;
});

SearchList.displayName = 'SearchList';
