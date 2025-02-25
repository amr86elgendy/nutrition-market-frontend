import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Circle } from 'lucide-react';

import { Price } from 'components/utils/price';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { getSingleProductBySlug } from 'features/products/apis';
import { ProductImages } from 'features/products/components/product-images';
import { Allergen } from 'features/products/components/allergen';
import ActionBtns from 'features/products/components/action-btns';
import SimilarProducts from 'features/products/components/similar-products';
import Reviews from 'features/reviews/components';

import { ProductInfo } from 'features/products/components/product-info';
import { ProductOptions } from 'features/products/components/product-options';
import { ProductAccordions } from 'features/products/components/product-accordions';
import { ProductsLoading } from 'features/products/components/products-loading';

import type { TSearchParams } from 'types/searchparams';
import { cn } from 'lib/utils';
import { TLocale } from 'i18n/config';

type TProps = {
	params: Promise<{ slug: string; locale: TLocale }>;
	searchParams: Promise<TSearchParams>;
};
export async function generateMetadata(props: TProps): Promise<Metadata> {
	const searchParams = await props.searchParams;
	const params = await props.params;

	const { slug, locale } = params;

	const product = await getSingleProductBySlug({ slug });
	const variant =
		product.variants.find(v => v._id.toString() === searchParams.variantId) ??
		product.variants[0];

	return {
		title: locale === 'ar' ? variant.name_ar : variant.name_en,
		description:
			locale === 'ar' ? product.description_ar : product.description_en,
	};
}

export default async function ProductPage(props: TProps) {
	const params = await props.params;
	const searchParams = await props.searchParams;
	const variantId: string = searchParams.variant;

	const locale = params.locale;
	const product = await getSingleProductBySlug({ slug: params.slug });

	const variant =
		product.variants.find(v => v._id.toString() === variantId) ??
		product.variants[0];

	const productDetailsDesktop = (
		<div className='media-md:grid hidden grid-cols-2'>
			<div className='flex flex-col justify-center gap-4 self-baseline border-r border-gray-50 pe-6'>
				<ProductImages images={variant.images} />
				<Allergen />
			</div>

			<div className='p-6'>
				<div className='mb-4 border-b border-gray-50'>
					<h2 className='typography-SB32 mb-4 items-center justify-center text-green-500'>
						{locale === 'ar' ? variant.name_ar : variant.name_en}
						<Circle
							size={14}
							className={cn(
								'ms-4 inline-block rounded-full',
								variant.quantity > 0
									? 'bg-green-light-500 text-green-light-500'
									: 'bg-red-500 text-red-500'
							)}
						/>
					</h2>

					<ProductInfo
						NFSA_REG_NO={product.NFSA_REG_NO}
						averageRating={product.averageRating}
						companyName={
							locale === 'ar'
								? product.company.name_ar
								: product.company.name_en
						}
						companySlug={product.company.slug}
						numReviews={product.numReviews}
					/>
				</div>

				<Price
					finalPriceClassName='typography-SB24'
					previousPriceClassName='text-gray-200'
					price={variant.price}
					priceAfterDiscount={variant.priceAfterDiscount}
				/>

				<div className='flex flex-col border-b border-gray-50 pb-8'>
					<ProductOptions
						currentVariant={variant}
						product={product}
						searchParams={searchParams}
					/>

					<div className='mb-10'>
						<h6 className='typography-SB14 mb-2'>Category: </h6>
						<ul className='flex flex-wrap items-center gap-2'>
							{product.category.map(cat => (
								<Button
									key={cat._id}
									asChild
									variant='outline'
									className='border-gray-40 rounded-md border px-4 py-1 text-gray-500'>
									<Link href={`/categories/${cat.slug}`}>
										{locale === 'ar' ? cat.name_ar : cat.name_en}
									</Link>
								</Button>
							))}
						</ul>
					</div>
					<ActionBtns
						productId={product._id}
						companyId={product.company?._id}
						variantId={variant._id}
						quantity={variant.quantity}
					/>
				</div>

				<ProductAccordions product={product} />
			</div>
		</div>
	);

	const productDetailsMobile = (
		<div className='media-md:hidden'>
			<div className='mt-2'>
				<div className='mb-4 border-b border-gray-50'>
					<h2 className='typography-SB24 mb-2 items-center justify-center text-green-500'>
						{locale === 'ar' ? variant.name_ar : variant.name_en}
						<Circle
							size={10}
							className={cn(
								'ms-2 inline-block rounded-full',
								variant.quantity > 0
									? 'bg-green-light-500 text-green-light-500'
									: 'bg-red-500 text-red-500'
							)}
						/>
					</h2>

					<ProductInfo
						NFSA_REG_NO={product.NFSA_REG_NO}
						averageRating={product.averageRating}
						companyName={
							locale === 'ar'
								? product.company.name_ar
								: product.company.name_en
						}
						companySlug={product.company.slug}
						numReviews={product.numReviews}
					/>
				</div>
				<Price
					finalPriceClassName='typography-SB24'
					previousPriceClassName='text-gray-200'
					price={variant.price}
					priceAfterDiscount={variant.priceAfterDiscount}
				/>
				<div className='mb-4'>
					<ProductImages images={variant.images} />
				</div>
			</div>

			<div>
				<div className='mb-4 flex flex-col border-b border-gray-50 pb-4'>
					<ProductOptions
						currentVariant={variant}
						product={product}
						searchParams={searchParams}
					/>

					<div className='mb-10'>
						<h6 className='typography-SB14 mb-2'>Category: </h6>
						<ul className='flex flex-wrap items-center gap-2'>
							{product.category.map(cat => (
								<Button
									key={cat._id}
									asChild
									variant='outline'
									className='border-gray-40 rounded-md border px-4 py-1 text-gray-500'>
									<Link href={`/categories/${cat.slug}`}>
										{locale === 'ar' ? cat.name_ar : cat.name_en}
									</Link>
								</Button>
							))}
						</ul>
					</div>

					<ActionBtns
						productId={product._id}
						companyId={product.company?._id}
						variantId={variant._id}
						quantity={variant.quantity}
					/>
				</div>

				<Allergen />
				<Separator className='mt-4' />

				<ProductAccordions product={product} />
			</div>
		</div>
	);

	return (
		<div className='container pb-10'>
			{productDetailsDesktop}

			{productDetailsMobile}

			<Separator className='mt-20 mb-6' />

			<Suspense
				fallback={
					<div className=''>
						<h3 className='typography-M16 mb-6'>Related products</h3>
						<ProductsLoading number={5} />
					</div>
				}>
				<SimilarProducts productId={product._id} />
			</Suspense>

			<Separator className='mt-20 mb-6' />

			<Suspense fallback='Loading'>
				<Reviews
					_id={product._id}
					slug={product.slug}
					averageRating={product.averageRating}
				/>
			</Suspense>
		</div>
	);
}
