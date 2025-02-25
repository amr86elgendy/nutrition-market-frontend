import Image from 'next/image';
import type { TCartItem } from 'features/cart/types/cart';
import { TicketIcon } from 'lucide-react';
import { Price } from 'components/utils/price';
import { cn } from 'lib/utils';
import { useLocale } from 'next-intl';

export default function CheckoutCartItem({
	_id,
	totalProductPrice,
	totalProductPriceAfterCoupon,
	variant,
	amount,
}: TCartItem) {
	const locale = useLocale();
	return (
		<li
			key={_id}
			className='flex gap-4'>
			<div className='border-gray-40 relative size-16 shrink-0 rounded-md border'>
				<Image
					src={variant.images[0].url}
					width={50}
					height={50}
					alt={variant.name_en}
					className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
				/>
				<div
					className={cn(
						'typography-M12 absolute end-0 top-0 flex size-[18px] -translate-y-1/2 items-center justify-center rounded-full bg-gray-50 py-2',
						{
							'-translate-x-1/2': locale === 'ar',
							'translate-x-1/2': locale === 'en',
						}
					)}>
					{amount}
				</div>
			</div>

			<div className='typography-M14 flex w-full flex-col justify-between text-gray-400'>
				<div className='flex justify-between'>
					<h3 className='line-clamp-2 text-left'>
						{locale === 'ar' ? variant.name_ar : variant.name_en}
					</h3>
					{totalProductPriceAfterCoupon && (
						<div className='bg-green-light-600 flex aspect-square size-5 items-center justify-center rounded-full'>
							<TicketIcon
								size={14}
								className='text-white'
							/>
						</div>
					)}
				</div>
				<Price
					className='ms-auto mb-0'
					finalPriceClassName='typography-M14 text-gray-200'
					price={totalProductPriceAfterCoupon ?? totalProductPrice}
				/>
			</div>
		</li>
	);
}
