import QueryString from 'qs';
import { TSearchParams } from 'types/searchparams';
import { getOffers, TOffersParams } from './apis';
import NoResultFound from 'assets/icons/no-result-found';
import { CardItem } from 'features/products/components/card-item';
import { Suspense } from 'react';
import { PaginationContainer } from 'features/products/components/pagination-container';

export default async function OffersProducts({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	const queryParams = QueryString.parse(searchParams) as TOffersParams;
	const { offers, lastPage, currentPage } = await getOffers(queryParams);
	if (!offers.length) {
		return (
			<div className='flex flex-col items-center justify-center pt-6'>
				<NoResultFound />
				<span className='typography-M16 mt-4 text-center'>
					No Matches Found
				</span>
				<span className='typography-R14 mt-2 max-w-[43ch] text-center text-gray-200'>
					We couldn&apos;t find any supplement that match your filters Try
					adjusting your search criteria
				</span>
			</div>
		);
	}
	return (
		<article>
			<div className='media-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] media-sm:gap-4 grid grid-cols-2 gap-2 self-baseline overflow-hidden'>
				{offers.map(product => (
					<CardItem
						key={product._id}
						{...product}
					/>
				))}
			</div>
			{lastPage > 1 && (
				<Suspense>
					<PaginationContainer
						lastPage={lastPage}
						currentPage={currentPage}
					/>
				</Suspense>
			)}
		</article>
	);
}
