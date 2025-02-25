'use client';

import { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { CircleCheckIcon, LoaderCircleIcon, TicketIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { TextField } from 'components/ui/text-field';
import { applyCoupon } from 'features/coupon/api';
import { toast } from 'components/ui/use-toast';
import type { TCart } from 'features/cart/types/cart';
import CouponBanner from './coupon-banner';
import { Button } from 'components/ui/button';
import { DeleteCouponButton } from './delete-coupon-button';

export function Coupon({ cart }: { cart: TCart }) {
	const t = useTranslations('CartPage');
	const locale = useLocale();
	const [couponCode, setCouponCode] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const { execute: executeApplyCoupon, isPending: isApplyingCoupon } =
		useAction(applyCoupon, {
			onError: ({ error }) => {
				toast({
					variant: 'destructive',
					title: 'Server Error',
					description: error.serverError,
				});
			},
			onSuccess: () => {
				setIsSuccess(true);
			},
		});
	useEffect(() => {
		const cleanTimeout = setTimeout(() => setIsSuccess(false), 2000);

		return () => {
			clearTimeout(cleanTimeout);
		};
	}, [isSuccess]);

	return (
		<div className='relative mb-4 overflow-hidden rounded-md'>
			<div className='mb-2 flex items-center gap-2'>
				<TicketIcon className='text-green-light-600' />
				<h4 className='typography-SB14 text-gray-500'>{t('code')}</h4>
			</div>

			<div className='flex gap-2'>
				<TextField
					size='xs'
					value={couponCode}
					onChange={e => setCouponCode(e.target.value)}
					suffexIcon={
						<>
							{isApplyingCoupon && (
								<LoaderCircleIcon
									size={16}
									className='animate-spin text-gray-500'
								/>
							)}
							{isSuccess && !isApplyingCoupon && (
								<CircleCheckIcon
									className='text-green-light-700'
									size={16}
								/>
							)}
						</>
					}
				/>
				<Button
					variant={'outline'}
					size='sm'
					className='typography-SB13'
					onClick={() => {
						if (!couponCode || isApplyingCoupon) return;
						executeApplyCoupon({ cartId: cart._id, couponCode });
					}}>
					{t('redeem')}
				</Button>
			</div>
			{!!cart.coupons?.length && (
				<ul className='mt-4 flex flex-wrap items-center gap-2'>
					{cart.coupons.map(coupon => (
						<li
							key={coupon.code}
							className='group bg-gray-30 typography-R13 relative inline-block rounded-xs px-3 py-1'>
							<div className='absolute start-0 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white' />
							<div className='absolute end-0 top-1/2 size-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-white' />
							<DeleteCouponButton
								cartId={cart._id}
								couponId={coupon._id}
							/>
							<span className='me-1 border-r border-dashed border-gray-100 pe-1'>
								{`${coupon.sale}%`}
							</span>
							<span>
								{coupon.code}{' '}
								<i className='typography-R12 text-gray-200'>
									{locale === 'ar'
										? coupon.company.name_ar
										: coupon.company.name_en}
								</i>
							</span>
						</li>
					))}
				</ul>
			)}

			{!!cart.coupons?.length && (
				<CouponBanner
					className='border-green-light-200 bg-green-light-50 text-green-light-700 mt-4 border'
					coupons={cart.coupons}
				/>
			)}
		</div>
	);
}
