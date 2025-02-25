import { PlaceOrderBtn } from 'features/orders/components/place-order-btn';
import { Button } from 'components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from 'components/ui/drawer';
import CheckoutCartItem from 'app/[locale]/checkout/checkout-cart-item';
import { TCart } from 'features/cart/types/cart';
import { Coupon } from 'features/coupon/components/coupon';
import { Separator } from 'components/ui/separator';
import { Price } from 'components/utils/price';

export function CheckoutSummaryMobile({
	cart,
	paymentMethodId,
	addressId,
}: {
	cart: TCart;
	paymentMethodId: string;
	addressId: string;
}) {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant='secondary-gray'>View Order</Button>
			</DrawerTrigger>
			<DrawerContent className='bg-white'>
				<DrawerHeader>
					<h1 className='border-gray-40 typography-SB20 mb-4 border-b pb-4 text-gray-800 capitalize'>
						Product summary
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
							<p>Total Price</p>
							<Price
								className='mb-0'
								finalPriceClassName='typography-M14 text-gray-200'
								price={cart.totalPrice}
							/>
						</div>
						<div className='mb-2 flex items-center justify-between'>
							<p>Total Price After Discount</p>
							{cart.totalPriceAfterCoupon ? (
								<Price
									className='mb-0'
									finalPriceClassName='typography-M14 text-gray-200'
									price={cart.totalPriceAfterCoupon}
								/>
							) : (
								'No discount'
							)}
						</div>
						<div className='mb-2 flex items-center justify-between'>
							<p>Shipping Fee</p>
							<span>Free</span>
						</div>
					</div>
					<Coupon cart={cart} />

					<Separator className='mb-4' />

					<div className='text-green-light-700 typography-SB18 mb-4 flex items-center justify-between'>
						<p className='text-green-800'>Total Price</p>
						<Price
							finalPriceClassName='typography-SB18'
							className='mb-0'
							price={cart.totalPriceAfterCoupon ?? cart.totalPrice}
						/>
					</div>
				</DrawerHeader>
				<DrawerFooter>
					<PlaceOrderBtn
						paymentMethodId={paymentMethodId}
						addressId={addressId}
						cartId={cart._id}
					/>
					<DrawerClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
