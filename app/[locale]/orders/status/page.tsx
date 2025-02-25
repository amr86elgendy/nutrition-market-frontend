import type { Metadata } from 'next';
import Link from 'next/link';
import { MoveLeftIcon, TruckIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Button } from 'components/ui/button';
import { CopyBtn } from 'components/utils/copy-btn';
import OrderCreateSuccessfully from 'assets/icons/order-created-successfully';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('OrderPage');
	return {
		title: t('thxForOrder'),
	};
}

export default async function OrderStatus(props: {
	searchParams: Promise<{ orderId: string }>;
}) {
	const searchParams = await props.searchParams;
	const t = await getTranslations('OrderPage');

	return (
		<div className='container flex flex-col items-center justify-center py-24'>
			<OrderCreateSuccessfully />
			<h2 className='typography-SB24 media-md:typography-SB36 mt-8 mb-2 text-green-800'>
				{t('thxForOrder')}
			</h2>
			<p className='mb-10 max-w-[50ch] text-center text-gray-300'>
				{t('thxDesc')}
			</p>
			<div className='mb-6 flex items-center gap-6'>
				<span className='text-gray-300'>{t('orderId')}</span>
				<span className='bg-gray-20 text-green-light-700 flex max-w-[150px] items-center gap-2 rounded-md border border-gray-50 px-2 py-1'>
					{`#${searchParams?.orderId?.slice(0, 8)}...`}
					<CopyBtn copyText={searchParams.orderId} />
				</span>
			</div>
			<div className='media-md:gap-4 flex gap-2'>
				<Button
					className='gap-2'
					variant='outline'
					asChild>
					<Link href='/'>
						<MoveLeftIcon size={20} />
						{t('backMain')}
					</Link>
				</Button>
				<Button
					className='gap-2'
					asChild>
					<Link href={`/orders/${searchParams.orderId}`}>
						<TruckIcon size={20} />
						{t('trackOrder')}
					</Link>
				</Button>
			</div>
		</div>
	);
}
