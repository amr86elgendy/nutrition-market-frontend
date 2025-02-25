import Link from 'next/link';
import Image from 'next/image';
import { TicketIcon } from 'lucide-react';
import { useLocale } from 'next-intl';

import { SheetClose } from 'components/ui/sheet';
import { Price } from 'components/utils/price';
import { DeleteCartItemBtn } from 'features/cart/components/delete-cart-item-btn';
import { IncDecBtn } from 'features/cart/components/inc-dec-btn';

import type { TCartItem } from 'features/cart/types/cart';

export function CartSideItem({
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
			className='flex gap-4 py-6'>
			<div className='w-24 space-y-2'>
				<div className='bg-gray-30 relative aspect-square h-auto w-full shrink-0 rounded-md'>
					<Image
						src={variant.images[0]?.url}
						width={70}
						height={70}
						alt={variant.name_en}
						className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
					/>
					<DeleteCartItemBtn itemId={_id} />
				</div>
				<IncDecBtn
					amount={amount}
					itemId={_id}
				/>
			</div>

			<div className='flex w-full flex-col justify-between'>
				<h3 className='flex justify-between'>
					<SheetClose asChild>
						<Link
							href={`/shop/${product.slug}?variant=${variant._id}`}
							className='typography-M16 line-clamp-2 text-green-700'>
							{locale === 'ar' ? variant.name_ar : variant.name_en}
						</Link>
					</SheetClose>
					{totalProductPriceAfterCoupon && (
						<div className='bg-green-light-600 flex aspect-square size-6 items-center justify-center rounded-full'>
							<TicketIcon
								size={16}
								className='text-white'
							/>
						</div>
					)}
				</h3>
				<Price
					finalPriceClassName='typography-M16 text-gray-400'
					previousPriceClassName='typography-R14 text-gray-400'
					className='ms-auto'
					price={totalProductPrice}
					priceAfterDiscount={totalProductPriceAfterCoupon}
				/>
			</div>
		</li>
	);
}
