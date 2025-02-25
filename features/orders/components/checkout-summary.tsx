import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Card } from 'components/ui/card';
import CheckoutCartItem from 'app/[locale]/checkout/checkout-cart-item';
import { PlaceOrderBtn } from 'features/orders/components/place-order-btn';
import { TCart } from 'features/cart/types/cart';
import { Separator } from 'components/ui/separator';
import { Coupon } from '../../coupon/components/coupon';
import { Price } from 'components/utils/price';

export function CheckoutSummary({
	cart,
	paymentMethodId,
	addressId,
}: {
	cart: TCart;
	paymentMethodId: string;
	addressId: string;
}) {
	const t = useTranslations('CheckoutPage');
	if (cart?.items.length === 0) redirect('/');
	return (
		<Card className='media-md:flex hidden max-w-[380px] flex-1 flex-col justify-between self-start p-6'>
			<h1 className='border-gray-40 typography-SB20 mb-4 border-b pb-4 text-gray-800 capitalize'>
				{t('summary')}
			</h1>
			<ul className='border-gray-40 relative mb-4 flex-1 space-y-4 rounded-md border-b pb-4'>
				{cart?.items?.map(item => {
					return (
						<CheckoutCartItem
							key={item._id}
							{...item}
						/>
					);
				})}
			</ul>
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
			<PlaceOrderBtn
				paymentMethodId={paymentMethodId}
				addressId={addressId}
				cartId={cart._id}
			/>
		</Card>
	);
}
