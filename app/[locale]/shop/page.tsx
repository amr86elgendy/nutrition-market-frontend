import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Filters } from 'features/filters';
import { SortBy } from 'features/filters/components/sort-by';
import { Products } from 'features/products/components';
import { ProductsLoading } from 'features/products/components/products-loading';
import { MobileFilter } from 'features/filters/components/mobile-filter';

import type { TSearchParams } from 'types/searchparams';
import adPhoto from 'assets/ad.png';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'ShopPage.pageMetadata',
	});

	return {
		title: t('title'),
	};
}

export default async function ShopPage(props: {
	searchParams: Promise<TSearchParams>;
}) {
	const searchParams = await props.searchParams;
	return (
		<section className='media-md:grid container h-full grid-cols-[278px_1fr] gap-x-6 gap-y-8 py-12'>
			<Filters />
			<div>
				<div className='media-sm:flex-row mb-4 flex min-h-56 flex-col items-center justify-between gap-6 rounded-md bg-[#d9f3fa] p-6 pe-10'>
					<div>
						<span className='typography-R12 mb-2 inline-block rounded-md bg-gray-500 px-2 py-1 text-white'>
							Sale up to 50%
						</span>
						<div className='text-[clamp(2rem,0.23rem+1.02vw,2rem)] leading-tight font-semibold tracking-tight text-balance text-gray-500'>
							Shop the vitamins and <br /> supplements
						</div>
						<span className='typography-R14 text-gray-200'>
							We have prepared special discounts for you on grocery products...
						</span>
					</div>
					<div>
						<Image
							width={225}
							height={225}
							alt=''
							className='media-md:max-w-[225px] w-full max-w-[150px] min-w-[200px] brightness-110'
							src={adPhoto}
						/>
					</div>
				</div>
				<div className='mb-4 flex items-center justify-between'>
					<MobileFilter />
					<Suspense>
						<SortBy />
					</Suspense>
				</div>
				<Suspense
					key={JSON.stringify(searchParams)}
					fallback={<ProductsLoading />}>
					<Products searchParams={searchParams} />
				</Suspense>
			</div>
		</section>
	);
}
