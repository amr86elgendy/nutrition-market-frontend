import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Price } from 'components/utils/price';
import { Separator } from 'components/ui/separator';
import { Coupon } from 'features/coupon/components/coupon';

import type { TCart } from 'features/cart/types/cart';
import { cn } from 'lib/utils';

export function CartSummary({
	isCartEmpty,
	cart,
}: {
	isCartEmpty: boolean;
	cart: TCart;
}) {
	const t = useTranslations('CartPage');
	return (
		<Card className='media-md:flex hidden max-w-[380px] flex-1 flex-col justify-between self-start p-6'>
			<h1 className='border-gray-40 typography-SB20 mb-4 border-b pb-4 text-gray-800 capitalize'>
				{t('summary')}
			</h1>

			<div className='border-gray-40 typography-R14 mb-4 border-b pb-4 text-gray-200'>
				<div className='mb-2 flex items-center justify-between'>
					<p>{t('subtotal')}</p>
					<Price
						className='mb-0'
						finalPriceClassName='typography-M14 text-gray-200'
						price={cart.totalPrice}
					/>
				</div>
				<div className='mb-2 flex items-center justify-between'>
					<p>{t('discount')}</p>
					{cart.totalPriceAfterCoupon ? (
						<Price
							className='mb-0'
							finalPriceClassName='typography-M14 text-gray-200'
							price={cart.totalPriceAfterCoupon}
						/>
					) : (
						t('noDiscount')
					)}
				</div>
				<div className='mb-2 flex items-center justify-between'>
					<p>{t('shipping')}</p>
					<span>{t('free')}</span>
				</div>
			</div>
			<Coupon cart={cart} />

			<Separator className='mb-4' />

			<div className='text-green-light-700 typography-SB18 mb-4 flex items-center justify-between'>
				<p className='text-green-800'>{t('total')}</p>
				<Price
					finalPriceClassName='typography-SB18'
					className='mb-0'
					price={cart.totalPriceAfterCoupon ?? cart.totalPrice}
				/>
			</div>
			<Button
				className={cn(
					isCartEmpty
						? 'pointer-events-none bg-green-50 text-green-200'
						: 'bg-green-500 text-white'
				)}
				asChild>
				<Link href='/checkout'>{t('checkout')}</Link>
			</Button>
		</Card>
	);
}
