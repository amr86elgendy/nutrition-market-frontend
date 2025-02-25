import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import parse from 'html-react-parser';

import FilterProducts from './filter';
import { Products } from 'features/products/components';
import { ProductsLoading } from 'features/products/components/products-loading';
import BuildingPlaceholder from 'assets/icons/building-placeholder';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { getSingleCompany } from 'apis/server/company';
import type { TSearchParams } from 'types/searchparams';
import type { TLocale } from 'i18n/config';

type TProps = {
	params: Promise<{ slug: string; locale: TLocale }>;
	searchParams: Promise<TSearchParams>;
};
export async function generateMetadata({ params }: TProps): Promise<Metadata> {
	const slug = (await params).slug;
	const { company } = await getSingleCompany({ slug });
	const locale = (await params).locale;

	return {
		title: locale === 'ar' ? company.name_ar : company.name_en,
	};
}

export default async function CompanyPage(props: TProps) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const { slug, locale } = params;

	const { company } = await getSingleCompany({ slug });

	const newSearchParams = {
		...searchParams,
		company: slug,
	};

	return (
		<section>
			<div className='h-48'>
				<Image
					alt={`${locale === 'ar' ? company.name_ar : company.name_en} cover photo`}
					width={1000}
					height={200}
					src={company.cover?.url ?? ''}
					className='h-full w-full origin-center object-cover object-center bg-blend-overlay'
				/>
			</div>
			<div className='container -mt-8'>
				<div className='media-md:flex-row flex flex-col gap-2'>
					<Avatar className='bg-gray-30 size-36 shrink-0 rounded-full border-8 border-white'>
						<AvatarImage src={company.logo?.url} />
						<AvatarFallback className='bg-gray-30 rounded-md text-gray-100'>
							<BuildingPlaceholder size={64} />
						</AvatarFallback>
					</Avatar>
					<div className='media-md:mt-10 [&>p]:typography-R14 space-y-1 [&>p]:leading-normal [&>p]:text-gray-200'>
						<div className='typography-B28 text-black capitalize'>
							{locale === 'ar' ? company.name_ar : company.name_en}
						</div>
						{parse(
							locale === 'ar' ? company.description_ar : company.description_en
						)}
					</div>
				</div>

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
