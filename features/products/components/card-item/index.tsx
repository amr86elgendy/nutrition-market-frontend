import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { RatingStars } from 'components/ui/rating-stars';
import { Price } from 'components/utils/price';
import { Sale } from 'components/utils/sale';
import { AddToCartButton } from 'components/utils/add-to-cart-btn';

import type { TProductWithSingleVariant } from 'features/products/types/product';

export const CardItem = ({
	variants,
	company,
	averageRating,
	slug,
	_id,
}: TProductWithSingleVariant) => {
	const locale = useLocale();
	const primaryImage = variants.images[0];

	const variantPath = `/shop/${slug}?variant=${variants._id}`;

	return (
		<div className='group media-sm:p-4 relative flex flex-col rounded-md border border-gray-50 p-2'>
			<Sale
				price={variants.price}
				priceAfterDiscount={variants.priceAfterDiscount}
			/>

			<div className='relative mb-2 flex w-full items-center justify-center self-center overflow-hidden rounded-xs'>
				<Link
					href={variantPath}
					className='media-md:h-48 media-md:w-48 flex aspect-square h-40 w-40 items-center justify-center'>
					<Image
						className='aspect-square w-full cursor-pointer object-contain p-2 mix-blend-multiply transition duration-300 group-hover:scale-110'
						src={primaryImage.url}
						alt={primaryImage.name}
						width={200}
						height={200}
					/>
				</Link>
				<AddToCartButton
					size='sm'
					className={
						'pointer-events-none invisible absolute w-[70%] -translate-y-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100'
					}
					quantity={variants.quantity}
					productId={_id}
					companyId={company._id ?? company}
					variantId={variants._id}
				/>

				<div className='absolute -end-10 top-0 flex flex-col gap-2 text-gray-500 transition-all duration-300 group-hover:end-0'>
					{/* <QuickViewButton
						name={name}
						images={images}
						price={price}
						_id={_id}
						description={description}
						colors={colors}
						priceAfterDiscount={priceAfterDiscount}
						averageRating={averageRating}
						numReviews={numReviews}
						icon={true}
					/> */}

					{/* <button className="relative group/wishlist">
            <div className="p-2 bg-gray-100 rounded-md cursor-pointer hover:bg-red-500 hover:text-white">
              <AiOutlineHeart size={24} />
            </div>
            <span className="bg-gray-500 text-white absolute top-8 end-[43px] -translate-y-full whitespace-nowrap  invisible opacity-0 px-2 py-1 text-sm rounded-md group-hover:visible group-hover/wishlist:opacity-100 transition pointer-events-none">
              WishList
            </span>
          </button> */}

					{/* <CompareButton
						name={name}
						images={images}
						price={price}
						_id={_id}
						description={description}
						colors={colors}
						priceAfterDiscount={priceAfterDiscount}
						averageRating={averageRating}
						numReviews={numReviews}
					/> */}
				</div>
			</div>

			<RatingStars
				averageRating={averageRating}
				className='mb-4'
				size={14}
			/>

			<Link
				className='typography-M14 mb-4 line-clamp-2 underline-offset-1 hover:underline'
				href={variantPath}>
				{locale === 'ar' ? variants.name_ar : variants.name_en}
			</Link>

			<div className='mt-auto'>
				<Price
					className='mb-0'
					previousPriceClassName='typography-R14 text-gray-200'
					finalPriceClassName='typography-SB18'
					price={variants.price}
					priceAfterDiscount={variants.priceAfterDiscount}
				/>
			</div>

			{/* <div className='flex gap-2'>
				{variants.map((v, i) => (
					<div
						// variant={'outline'}
						className={cn(
							'flex items-center justify-start gap-1 self-start rounded-md bg-gray-30 px-2 py-1 typography-R12',
							i === 1 && 'border border-gray-50 bg-white'
						)}>
						{v.unitCount} <PillIcon size={12} />
					</div>
				))}
			</div> */}
		</div>
	);
};
