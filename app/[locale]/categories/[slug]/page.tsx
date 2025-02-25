import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import parse from 'html-react-parser';

import FilterProducts from './filter';
import { Products } from 'features/products/components';
import { ProductsLoading } from 'features/products/components/products-loading';
import { getSingleCategory } from 'apis/server/category';
import type { TSearchParams } from 'types/searchparams';
import type { TLocale } from 'i18n/config';

type TProps = {
	params: Promise<{ slug: string; locale: TLocale }>;
	searchParams: Promise<TSearchParams>;
};
export async function generateMetadata({ params }: TProps): Promise<Metadata> {
	const slug = (await params).slug;
	const locale = (await params).locale;

	const { category } = await getSingleCategory({ slug });

	return {
		title: locale === 'ar' ? category.name_ar : category.name_en,
		// openGraph: {
		// 	images: ['/some-specific-page-image.jpg', ...previousImages],
		// },
	};
}

export default async function CategoryPage(props: TProps) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const { slug, locale } = params;

	const { category } = await getSingleCategory({ slug });

	const newSearchParams = {
		...searchParams,
		category: slug,
	};
	return (
		<section>
			<div className='bg-gray-30 relative flex h-48 w-full items-center justify-center'>
				<div className='absolute inset-0 z-2 bg-linear-to-r from-[#00000023] from-10% via-[#01210c96] via-30% to-[#00000023] to-90% bg-blend-multiply mix-blend-multiply' />
				<div className='[&>p]:typography-R14 z-4 text-center text-white [&>p]:leading-normal [&>p]:text-gray-200'>
					<h3 className='typography-B28 mb-1 capitalize'>
						{locale === 'ar' ? category.name_ar : category.name_en}
					</h3>
					<span className='text-white'>
						{parse(
							locale === 'ar'
								? category.description_ar
								: category.description_en
						)}
					</span>
				</div>
				<Image
					alt={`${locale === 'ar' ? category.name_ar : category.name_en} cover photo`}
					width={1000}
					height={200}
					src={category.cover?.url}
					className='absolute inset-0 h-full w-full origin-center object-cover object-center bg-blend-overlay'
				/>
			</div>
			<div className='container -mt-8'>
				<div className='media-md:grid-cols-[278px_1fr] grid gap-x-6 gap-y-8 py-12'>
					<FilterProducts />
					<Suspense
						key={JSON.stringify(newSearchParams)}
						fallback={<ProductsLoading />}>
						<Products searchParams={newSearchParams} />
					</Suspense>
				</div>
			</div>
		</section>
	);
}
