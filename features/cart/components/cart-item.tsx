import { Pill } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import type { TCartItem } from 'features/cart/types/cart';
import { IncDecBtn } from 'features/cart/components/inc-dec-btn';

import { DeleteCartItemBtn } from 'features/cart/components/delete-cart-item-btn';
import { Price } from 'components/utils/price';

export function CartItem({
	amount,
	product,
	_id,
	totalProductPrice,
	totalProductPriceAfterCoupon,
	variant,
}: TCartItem) {
	const locale = useLocale();
	return (
		<li
			key={_id}
			className='relative flex gap-4 py-6'>
			<div className='self-center'>
				<DeleteCartItemBtn
					className='relative flex-1 translate-x-0 translate-y-0'
					itemId={_id}
				/>
			</div>
			<div className='bg-gray-30 relative aspect-square size-24 shrink-0 rounded-md'>
				<Image
					src={variant.images[0].url}
					width={500}
					height={500}
					alt={variant.name_en}
					className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
				/>
			</div>

			<div className='flex w-full flex-col justify-between gap-4'>
				<h3 className='flex justify-between gap-4'>
					<Link
						href={`/shop/${product}?variant=${variant._id}`}
						className='typography-SB16 mb-2 line-clamp-2 text-green-700'>
						{locale === 'ar' ? variant.name_ar : variant.name_en}
					</Link>
					<span className='border-gray-40 flex items-center justify-start gap-2 self-start rounded-md border px-2 py-1'>
						{variant.unitCount} <Pill size={16} />
					</span>
				</h3>
				<div className='flex items-end justify-between'>
					<Price
						className='mb-0'
						finalPriceClassName='typography-M18 text-gray-300 '
						previousPriceClassName='typography-R14 text-gray-200'
						price={totalProductPrice}
						priceAfterDiscount={totalProductPriceAfterCoupon}
					/>
					<IncDecBtn
						amount={amount}
						itemId={_id}
					/>
				</div>
			</div>
		</li>
	);
}
