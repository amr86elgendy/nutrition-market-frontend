import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Container from './container';

import { getCart } from 'features/cart/apis/cart';
import { getMe } from 'features/auth/apis/user';
import { getUserAddresses } from 'features/addresses/apis/address';
import { getGovernorates } from 'features/addresses/apis/egypt';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'CheckoutPage.pageMetadata',
	});

	return {
		title: t('title'),
	};
}
export default async function CheckoutPage() {
	const [addresses, governorates, user, cart] = await Promise.all([
		getUserAddresses(),
		getGovernorates(),
		getMe(),
		getCart(),
	]);

	const t = await getTranslations('CheckoutPage');

	return (
		<div className='relative'>
			<div className='bg-gray-20 absolute inset-x-0 top-0 -z-10 h-56' />
			<div className='container flex min-h-screen flex-col gap-4 py-10'>
				<div>
					<h3 className='typography-B24 text-gray-800'>{t('checkout')}</h3>
					<p className='typography-R16 mb-8 text-gray-200'>
						{t('checkoutDesc')}
					</p>
				</div>
				<Container
					cart={cart}
					addresses={addresses}
					governorates={governorates}
					userEmail={user?.email}
					userFirstName={user?.firstName}
					userLastName={user?.lastName}
					userPhoneNumber={user?.phoneNumber}
				/>
			</div>
		</div>
	);
}
