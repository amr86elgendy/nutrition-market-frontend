import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CartItem } from 'features/cart/components/cart-item';
import { CartSummary } from 'features/cart/components/cart-summary';
import { getCart } from 'features/cart/apis/cart';
import NoCartFound from 'assets/icons/no-cart-found';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'CartPage.pageMetadata',
	});

	return {
		title: t('title'),
	};
}

export default async function Cart() {
	const cart = await getCart();
	const t = await getTranslations('CartPage');
	const isCartEmpty = cart.items.length === 0;

	return (
		<div className='relative'>
			<div className='bg-gray-20 absolute inset-x-0 top-0 -z-10 h-56' />
			<div className='container flex flex-col gap-4 py-10'>
				<div>
					<h3 className='typography-B24 text-gray-800'>{t('cart')}</h3>
					<p className='typography-R16 mb-8 text-gray-200'>{t('cartDesc')}</p>
				</div>
				<div className='flex gap-8'>
					<div className='border-gray-40 flex-1 self-start rounded-lg border bg-white'>
						{isCartEmpty ? (
							<div className='flex flex-col items-center justify-center gap-4 p-8'>
								<NoCartFound />
								<h1 className='text-center text-gray-800'>{t('emptyCart')}</h1>
							</div>
						) : (
							<ul className='divide-y divide-gray-50 px-6'>
								{cart?.items.map(cartItem => (
									<CartItem
										key={cartItem._id}
										{...cartItem}
									/>
								))}
							</ul>
						)}
					</div>

					<CartSummary
						isCartEmpty={isCartEmpty}
						cart={cart}
					/>
				</div>
			</div>
		</div>
	);
}
