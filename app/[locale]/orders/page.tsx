import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { useLocale } from 'next-intl';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import 'dayjs/locale/en';

import { getAllOrders } from 'features/orders/apis/orders';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';
import { ORDER_STATUS } from 'constants/index';
import { cn } from 'lib/utils';
import type { TOrderItem } from 'features/orders/types/order';
import { Price } from 'components/utils/price';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'OrderPage.pageMetadata',
	});

	return {
		title: t('title'),
	};
}
function OrderItem({
	amount,
	totalProductPrice,
	totalProductPriceAfterCoupon,
	variant,
}: TOrderItem) {
	const locale = useLocale();
	return (
		<li className='flex w-full gap-4'>
			<div className='bg-gray-30 relative size-20 shrink-0 rounded-md'>
				<Image
					src={variant.images[0].url}
					width={64}
					height={64}
					alt={variant.name_en}
					className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
				/>
				<div
					className={cn(
						'typography-M12 absolute end-0 top-0 flex size-[18px] -translate-y-1/2 items-center justify-center rounded-full bg-gray-50 py-2',
						{
							'translate-x-1/2': locale === 'ar',
							'-translate-x-1/2': locale !== 'en',
						}
					)}>
					{amount}
				</div>
			</div>

			<div className='typography-M16 flex w-full flex-col text-gray-400'>
				<h4 className='line-clamp-2'>
					{locale === 'ar' ? variant.name_ar : variant.name_en}
				</h4>
				<div className='flex h-full justify-between'>
					<span className='typography-R14 mt-2'>{variant.unitCount} Caps</span>
					<Price
						className='ms-auto mb-0'
						finalPriceClassName='typography-M14 text-gray-400'
						price={Number(totalProductPriceAfterCoupon ?? totalProductPrice)}
					/>
				</div>
			</div>
		</li>
	);
}

export default async function Orders() {
	const orders = await getAllOrders();
	const ordersNumber = orders.length;

	const t = await getTranslations('OrderPage');
	const locale = await getLocale();

	return (
		<div className='container flex min-h-screen flex-col py-14'>
			<h3 className='typography-M20 mb-6 flex items-center gap-2'>
				{t('myOrders')}
				<div className='bg-gray-30 typography-M16 flex size-6 items-center justify-center rounded-md'>
					<span>{ordersNumber}</span>
				</div>
			</h3>
			{orders.map(order => {
				const formattedCreatedAtDate = dayjs(order.createdAt)
					.locale(locale)
					.format('MMMM D, YYYY');

				return (
					<Card
						key={order._id}
						className='relative mb-8 max-w-[800px] overflow-hidden'>
						<div className='flex items-center justify-between p-4'>
							<div className='flex flex-col'>
								<span className='typography-R14 text-gray-200'>
									{t('orderId')}
								</span>
								<span className='typography-M18'>{order._id}</span>
							</div>
							<div
								className={cn(
									'typography-R13 max-w-fit rounded-md px-2 py-1 text-white capitalize',
									{
										'border border-orange-100 bg-orange-50 text-orange-500':
											order.status === ORDER_STATUS.processing,
										'border-green-light-200 bg-green-light-50 text-green-light-600 border':
											order.status === ORDER_STATUS.delivered,
										'bg-[#1640d60f] text-[#1640D6]':
											order.status === ORDER_STATUS.shipped,
										'border border-red-100 bg-red-50 text-red-500':
											order.status === ORDER_STATUS.cancelled,
									}
								)}>
								{t(order.status)}
							</div>
						</div>

						{/* <div className='relative p-4'> */}
						<ul className='grid max-h-[250px] grid-cols-2 items-center gap-8 overflow-y-auto p-4'>
							{order.orderItems.map(item => (
								<OrderItem
									key={item._id}
									{...item}
								/>
							))}
						</ul>
						{/* {isOrdersItemExceedLimit && (
								<div className='absolute inset-x-0 bottom-0 h-[150px] w-full bg-linear-to-t from-white to-[rgba(255,255,255,0)]' />
							)} */}
						{/* </div> */}
						<div className='border-gray-40 bg-gray-20 flex items-center gap-x-12 border-t p-4'>
							<div className='flex flex-col'>
								<span className='typography-R14 text-gray-200 capitalize'>
									{t('orderDate')}
								</span>
								<span>{formattedCreatedAtDate}</span>
							</div>
							<div className='flex flex-col'>
								<span className='typography-R14 text-gray-200 capitalize'>
									{t('total')}
								</span>
								<Price
									finalPriceClassName='typography-SB16'
									className='mb-0'
									price={order.total}
								/>
							</div>
							<div className='ms-auto flex gap-2'>
								<Button
									variant={
										order.status === ORDER_STATUS.delivered
											? 'outline'
											: 'primary'
									}>
									<Link href={`orders/${order._id}`}>
										{order.status === ORDER_STATUS.delivered
											? t('orderDetails')
											: t('trackOrder')}
									</Link>
								</Button>
								{order.status === ORDER_STATUS.delivered && (
									<Button>Reorder</Button>
								)}
							</div>
						</div>
					</Card>
				);
			})}
		</div>
	);
}
