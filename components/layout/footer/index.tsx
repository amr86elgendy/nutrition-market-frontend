import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HeadsetIcon, MapPinIcon } from 'lucide-react';

export function Footer() {
	const t = useTranslations('Footer');
	const myAccount = [
		{ label: t('myProfile'), link: '/profile' },
		{ label: t('cart'), link: '/cart' },
		{ label: t('checkout'), link: '/checkout' },
	];
	const quickLinks = [
		{ label: t('offers'), link: '/shop/offers' },
		{ label: t('bestSeller'), link: '/shop?sort=-sold' },
		{ label: t('newArrivals'), link: '/shop?sort=-createdAt' },
		// { label: t('allBrands'), link: '/companies' },
	];

	const customerService = [
		{ label: t('contactUs'), link: '/contact-us' },
		{ label: t('orderTracking'), link: '/orders' },
		{ label: t('suggestProduct'), link: '/suggest-product' },
		{ label: t('shippingPolicy'), link: '/shipping' },
	];

	return (
		<footer className='mt-auto bg-[#344e41] py-12'>
			<div className='container text-white'>
				<div className='media-md:grid-cols-4 mb-4 grid grid-cols-2 gap-x-4 gap-y-10 border-b border-green-400 pb-8 text-sm'>
					<div className='media-md:gap-6 flex flex-col gap-4'>
						{/* <h2 className='text-[#a3b18a] typography-M16'>Let&apos;s Talk</h2> */}
						<div>
							<div className='mb-2 flex items-center gap-2'>
								<HeadsetIcon
									size={48}
									className='text-[#dda15e]'
								/>
								<div>
									<h3>{t('phoneNumber')}</h3>
									<h2
										dir='ltr'
										className='media-md:text-lg font-semibold text-[#dda15e]'>
										+02 0100 571 2891
									</h2>
									<h2
										dir='ltr'
										className='media-md:text-lg font-semibold text-[#dda15e]'>
										+02 0111 598 2393
									</h2>
								</div>
							</div>
							<div className='mb-2 flex items-center gap-2'>
								<MapPinIcon
									size={48}
									className='text-[#dda15e]'
								/>
								<div>
									<h3>{t('ourLocation')}</h3>
									<h2
										dir='ltr'
										className='typography-SB14 text-[#dda15e]'>
										{t('cairoEgy')}
									</h2>
								</div>
							</div>
						</div>
					</div>

					<div className='media-md:gap-6 flex flex-col gap-4'>
						<h2 className='typography-M16 text-[#a3b18a]'>{t('myAccount')}</h2>
						<ul className='flex flex-col gap-2'>
							{myAccount.map((item, i) => (
								<li
									key={i}
									className='cursor-pointer transition-all duration-200 hover:translate-x-2 hover:text-[#dda15e]'>
									<Link href={item.link}>{item.label}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='media-md:gap-6 flex flex-col gap-4'>
						<h2 className='typography-M16 text-[#a3b18a]'>{t('quickLinks')}</h2>
						<ul className='flex flex-col gap-2'>
							{quickLinks.map((item, i) => (
								<li
									key={i}
									className='cursor-pointer transition-all hover:translate-x-2 hover:text-[#dda15e]'>
									<Link href={item.link}>{item.label}</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='media-md:gap-6 flex flex-col gap-4'>
						<h2 className='typography-M16 text-[#a3b18a]'>
							{t('customerService')}
						</h2>
						<ul className='flex flex-col gap-2'>
							{customerService.map((item, i) => (
								<li
									key={i}
									className='cursor-pointer transition-all hover:translate-x-2 hover:text-[#dda15e]'>
									<Link href={item.link}>{item.label}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<p className='typography-R14'>
					{t('rightsReserved')}{' '}
					<span className='text-[#a3b18a]'>{t('ident')}</span> .
				</p>
				<p className='typography-R14'>
					{t('developedBy')}{' '}
					<span className='text-[#a3b18a]'>{t('ourNames')}</span> .
				</p>
			</div>
		</footer>
	);
}
