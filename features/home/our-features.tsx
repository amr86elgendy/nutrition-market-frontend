import { useTranslations } from 'next-intl';

import { PaymentIcon } from 'assets/icons/payment-icon';
import { DeliveryIcon } from 'assets/icons/delivery-icon';
import { SaleIcon } from 'assets/icons/sale-icon';

export default function OurFeatures() {
	const t = useTranslations('HomePage.ourFeatures');

	const FEATURES = [
		{
			title: t('firstTitle'),
			description: t('firstDescription'),
			Icon: PaymentIcon,
		},
		{
			title: t('secondTitle'),
			description: t('secondDescription'),
			Icon: DeliveryIcon,
		},
		{
			title: t('thirdTitle'),
			description: t('thirdDescription'),
			Icon: SaleIcon,
		},
	];

	return (
		<div className='container flex flex-wrap items-center justify-between gap-8 py-10'>
			{FEATURES.map(f => (
				<div
					key={f.title}
					className='flex gap-4'>
					<div className='flex'>
						<f.Icon className='size-[68px] object-contain' />
					</div>
					<div>
						<p className='typography-SB16 mb-1'>{f.title}</p>
						<p className='typography-R13 media-md:max-w-[30ch] text-gray-200'>
							{f.description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
