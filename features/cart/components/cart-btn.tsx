import { useLocale, useTranslations } from 'next-intl';
import { ShoppingBasket } from 'lucide-react';

import { TCart } from 'features/cart/types/cart';
import { Price } from 'components/utils/price';
import { cn } from 'lib/utils';

export function CartBtn({ cart }: { cart: TCart }) {
	const locale = useLocale();
	const t = useTranslations('CartPage');
	return (
		<>
			<div className='relative'>
				<ShoppingBasket />
				<span
					className={cn(
						'typography-M12 absolute end-1/2 -top-3/4 flex size-[18px] translate-x-1/2 items-center justify-center rounded-full bg-[#dda15e] text-white',
						{ '-translate-x-1/2': locale === 'ar' }
					)}>
					{cart.totalItems}
				</span>
			</div>
			<div className='typography-M14 media-md:flex hidden flex-col items-start'>
				<p className='text-black'>{t('cart')}</p>
				<Price
					finalPriceClassName='typography-M14 '
					price={cart.totalPriceAfterCoupon ?? cart.totalPrice}
				/>
			</div>
		</>
	);
}
