import { TCart } from 'features/cart/types/cart';
import { cn } from 'lib/utils';

export default function CouponBanner({
	coupons,
	className,
}: {
	coupons: TCart['coupons'];
	className?: string;
}) {
	const sales = coupons.map(c => c.sale).join(', ');
	const companyNames = coupons.map(c => c.company.name).join(', ');

	const isMoreThanCoupon = coupons.length > 1;

	return (
		<div
			className={cn(
				'border-green-light-200 bg-green-light-50 text-green-light-700 typography-M13 flex gap-2 rounded-md border p-2',
				className
			)}>
			<p>
				You have got <span className='typography-B14'>{sales}%</span> discount
				on all products from{' '}
				<span className='typography-B14'>{companyNames}</span> in your cart
				{isMoreThanCoupon ? ' respectively' : ''}!
			</p>
		</div>
	);
}
