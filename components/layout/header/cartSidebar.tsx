import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { MoveLeftIcon, MoveRightIcon } from 'lucide-react';

import { Button } from 'components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'components/ui/sheet';
import { Separator } from 'components/ui/separator';
import { Price } from 'components/utils/price';
import { CartSideItem } from 'features/cart/components/cart-side-item';
import { CartBtn } from 'features/cart/components/cart-btn';
import { getCart } from 'features/cart/apis/cart';
import NoCartFound from 'assets/icons/no-cart-found';
import CouponBanner from 'features/coupon/components/coupon-banner';
import { cn } from 'lib/utils';

export async function CartSidebar({
	triggerClassName,
	contentClassName,
}: {
	triggerClassName?: string;
	contentClassName?: string;
}) {
	const cart = await getCart();
	const t = await getTranslations('CartPage');
	const locale = await getLocale();
	const isCartEmpty = cart.items.length === 0;
	return (
		<Sheet>
			<SheetTrigger
				className={cn(
					'relative flex items-center gap-2 text-green-500',
					triggerClassName
				)}>
				<CartBtn cart={cart} />
			</SheetTrigger>

			<SheetContent
				side={locale === 'ar' ? 'left' : 'right'}
				className={cn('flex w-full flex-col', contentClassName)}>
				<SheetHeader className='border-b border-gray-50 pb-4'>
					<SheetTitle>{t('cart')}</SheetTitle>
				</SheetHeader>

				{!!cart.coupons?.length && <CouponBanner coupons={cart.coupons} />}

				{isCartEmpty ? (
					<div className='mt-8 flex flex-col items-center justify-center gap-y-4'>
						<NoCartFound />
						<h1 className='typography-M16 text-center text-gray-800'>
							{t('emptyCart')}
						</h1>
					</div>
				) : (
					<>
						<ul className='relative flex-1 divide-y divide-gray-50 overflow-y-auto'>
							{cart?.items?.map(item => {
								return (
									<CartSideItem
										key={item._id}
										{...item}
									/>
								);
							})}
						</ul>

						<Separator />

						<SheetFooter className='mt-auto flex-col space-y-4'>
							<div className='flex items-start justify-between gap-2 text-base font-medium text-gray-900'>
								<div>
									<p>{t('subtotal')}</p>
									<p className='typography-R14 mt-0.5 text-gray-300'>
										{t('taxesCalc')}
									</p>
								</div>
								<Price
									className='mb-0 shrink-0'
									finalPriceClassName='typography-B18'
									price={cart.totalPriceAfterCoupon ?? cart.totalPrice}
								/>
							</div>

							<div className='grid grid-cols-2 gap-2'>
								<SheetClose asChild>
									<Button asChild>
										<Link href='/checkout'>{t('checkout')}</Link>
									</Button>
								</SheetClose>
								<SheetClose asChild>
									<Button
										variant='outline'
										asChild>
										<Link href='/cart'>{t('viewCart')}</Link>
									</Button>
								</SheetClose>
							</div>
							<div className='flex justify-center text-center text-sm text-gray-500'>
								<p className='flex items-center gap-x-2'>
									{t('or')}
									<SheetClose asChild>
										<Link
											href='/shop'
											className='flex items-center gap-x-2 font-medium text-neutral-800 underline hover:text-neutral-700'>
											{t('continueShopping')}
											{locale === 'ar' ? (
												<MoveLeftIcon size={18} />
											) : (
												<MoveRightIcon size={18} />
											)}
										</Link>
									</SheetClose>
								</p>
							</div>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	);
}
