import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import {
	CheckIcon,
	CircleAlertIcon,
	CircleDollarSignIcon,
	MapPinIcon,
	PackageCheckIcon,
	PhoneIcon,
	TruckIcon,
	UnplugIcon,
} from 'lucide-react';
import dayjs from 'dayjs';

import { getSingleOrder } from 'features/orders/apis/orders';
import { Card } from 'components/ui/card';
import type { TOrder, TOrderItem } from 'features/orders/types/order';
import { Separator } from 'components/ui/separator';
import { CancelOrderButton } from 'features/orders/components/cancel-order-button';
import { Price } from 'components/utils/price';

import {
	ORDER_STATUS,
	PAYMENT_METHODS_MAPPER,
	TOrderStatus,
} from 'constants/index';
import { cn } from 'lib/utils';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('OrderPage');
	return {
		title: t('orderDetails'),
	};
}

const orderLabel = {
	true: { label: 'paid', color: 'bg-green-light-500' },
	false: { label: 'unpaid', color: 'bg-orange-500' },
	cancelled: { label: 'cancelled', color: 'bg-red-500' },
} as const;
function OrderLabel({
	isPaid,
	status,
}: {
	isPaid: boolean;
	status?: TOrderStatus;
}) {
	const t = useTranslations('OrderPage');
	const isCancelled = status === ORDER_STATUS.cancelled;
	const orderState = ((isCancelled && status) ||
		String(isPaid)) as keyof typeof orderLabel;

	const label = orderLabel[orderState]?.label;
	const color = orderLabel[orderState]?.color;

	return (
		<div className={cn('typography-M14 rounded-md px-4 text-white', color)}>
			{t(label)}
		</div>
	);
}

function OrderDetails({
	itemsNumber,
	createdAt,
	updatedAt,
}: {
	itemsNumber: number;
	createdAt: string;
	updatedAt?: string;
}) {
	const t = useTranslations('OrderPage');
	const locale = useLocale();
	const formattedCreatedAtDate = dayjs(createdAt)
		.locale(locale)
		.format('MMMM D, YYYY');
	const formattedUpdatedAtDate = dayjs(updatedAt)
		.locale(locale)
		.format('MMMM D, YYYY');

	const orderDetails = {
		item: { label: t('item'), text: itemsNumber },
		orderDate: { label: t('orderDate'), text: formattedCreatedAtDate },
		...(updatedAt && {
			updatedAt: {
				label: t('updatedAt'),
				text: formattedUpdatedAtDate,
			},
		}),
	};

	return Object.entries(orderDetails).map(([key, value]) => (
		<p
			key={key}
			className='typography-R14 flex items-center gap-2'>
			<span className='text-gray-200 capitalize'>{value.label}:</span>
			{value.text}
		</p>
	));
}

function OrderItem({
	amount,
	totalProductPrice,
	totalProductPriceAfterCoupon,
	variant,
}: TOrderItem) {
	const locale = useLocale();
	return (
		<li className='border-gray-40 flex w-full gap-4 border-b pb-6 last:border-0 last:pb-0'>
			<div className='bg-gray-30 relative size-20 shrink-0 rounded-md'>
				<Image
					src={variant.images[0].url}
					width={64}
					height={64}
					alt={variant.name_en}
					className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
				/>
				<div className='typography-M12 absolute end-0 top-0 flex size-[18px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-50 py-2'>
					{amount}
				</div>
			</div>

			<div className='typography-M16 flex w-full flex-col text-gray-400'>
				<h4 className='line-clamp-2 h-8'>
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

function OrderSummary({ order }: { order: TOrder }) {
	const t = useTranslations('OrderPage');
	const paymentMethod = PAYMENT_METHODS_MAPPER.find(
		method => method.id === order.paymentMethod.id
	)!;

	return (
		<Card className='flex max-w-[380px] flex-1 flex-col justify-between self-start overflow-hidden p-6'>
			<h3 className='typography-SB16 mb-4 text-gray-800 capitalize'>
				{t('delivery')}
			</h3>
			<div className='border-gray-40 mb-4 border-b pb-4'>
				<div className='mb-4 flex items-start gap-2'>
					<MapPinIcon
						className='mt-[2px] text-gray-200'
						size={20}
					/>
					<div>
						<p className='typography-M14'>{t('address')}</p>
						<p className='typography-R13 text-gray-200'>
							{`${order.shippingAddress.street} - ${order.shippingAddress.city} - ${order.shippingAddress.governorate}`}
						</p>
					</div>
				</div>

				<div className='mb-4 flex items-start gap-2'>
					<PhoneIcon
						className='mt-[2px] text-gray-200'
						size={20}
					/>
					<div>
						<p className='typography-M14'>{t('phone')}</p>
						<p className='typography-R13 text-gray-200'>
							{order.shippingAddress.phone}
						</p>
					</div>
				</div>

				<div className='mb-4 flex items-start gap-2'>
					<CircleDollarSignIcon
						className='mt-[2px] text-gray-200'
						size={20}
					/>
					<div>
						<p className='typography-M14'>{t('paymentMethod')}</p>
						<p className='typography-R13 text-gray-200'>
							{t(paymentMethod.name)}
						</p>
					</div>
				</div>
			</div>

			<h3 className='typography-SB16 mb-4 text-gray-800 capitalize'>
				{t('summary')}
			</h3>
			<div className='border-gray-40 typography-R14 mb-4 border-b pb-4 text-gray-200'>
				<div className='mb-2 flex items-center justify-between'>
					<p>{t('subtotal')}</p>
					<Price
						finalPriceClassName='typography-R14 text-gray-200'
						className='mb-0'
						price={order.subtotal}
					/>
				</div>
				<div className='mb-2 flex items-center justify-between'>
					<p>{t('shippingFee')}</p>
					<Price
						finalPriceClassName='typography-R14 text-gray-200'
						className='mb-0'
						price={order.shippingFee}
					/>
				</div>
			</div>
			<div className='text-green-light-700 typography-SB16 flex items-center justify-between'>
				<p className='text-green-800'>{t('total')}</p>
				<Price
					finalPriceClassName='typography-SB18'
					className='mb-0'
					price={order.total}
				/>
			</div>
		</Card>
	);
}

export function OrderTracker({ status }: { status: TOrderStatus }) {
	const t = useTranslations('OrderPage');
	const trackingStatus: Record<Partial<TOrderStatus>, any> = {
		[ORDER_STATUS.processing]: {
			order: 1,
			label: {
				pending: t('processing'),
				completed: t('processed'),
			},
			icon: <UnplugIcon className='shrink-0' />,
		},
		[ORDER_STATUS.shipped]: {
			order: 2,
			label: {
				pending: t('shipping'),
				completed: t('shipped'),
			},
			icon: <PackageCheckIcon className='shrink-0' />,
		},
		[ORDER_STATUS.delivered]: {
			order: 3,
			label: {
				pending: t('delivering'),
				completed: t('delivered'),
			},
			icon: <TruckIcon className='shrink-0' />,
		},
		cancelled: undefined,
	};

	return (
		<Card className='mb-6 flex items-center justify-between p-6'>
			{Object.entries(trackingStatus).map(([key, value], i) => {
				if (!value) return;

				const order = i + 1;

				const isPending = status === key;
				const isCompleted =
					trackingStatus[status]?.order > order ||
					status === ORDER_STATUS.delivered;
				const isInFuture = trackingStatus[status]?.order < order;

				return (
					<>
						<div className='flex shrink-0 flex-col items-center justify-center'>
							<div className='relative mb-3 flex size-[48px] items-center justify-center'>
								<div
									className={cn(
										'absolute inset-0 z-1 flex items-center justify-center rounded-full border-2',
										{
											'border-gray-80 text-gray-80': isInFuture,
											'border-green-light-600 text-green-light-600 bg-white p-4':
												isPending,
											'border-green-light-600 bg-green-light-600 text-white':
												isCompleted,
										}
									)}>
									{isCompleted ? (
										<CheckIcon className='shrink-0' />
									) : (
										value.icon
									)}
								</div>
								{isPending && !isCompleted && (
									<div className='bg-green-light-100 absolute inset-0 scale-125 animate-ping rounded-full' />
								)}
							</div>
							<span
								className={cn('typography-R14', isInFuture && 'text-gray-80')}>
								{isCompleted ? value.label.completed : value.label.pending}
							</span>
						</div>
						<Separator className='-mt-7 h-[2px] w-auto flex-1 shrink last:hidden' />
					</>
				);
			})}
		</Card>
	);
}

export default async function Order(props: {
	params: Promise<{ orderId: string }>;
}) {
	const t = await getTranslations('OrderPage');
	const params = await props.params;
	const order = await getSingleOrder({ orderId: params.orderId });
	const orderItemsNumber = order.orderItems.reduce((acc, currValue) => {
		acc += currValue.amount;
		return acc;
	}, 0);

	return (
		<div className='container flex min-h-screen flex-col py-14'>
			<div className='flex gap-6'>
				<Card className='flex flex-1 flex-col self-start bg-white p-6'>
					<h4 className='typography-SB24 mb-4 flex items-center gap-4 text-green-700'>
						{t('orderId')} : {params.orderId}{' '}
						<OrderLabel
							status={order.status}
							isPaid={order.paid}
						/>
					</h4>

					<div className='mb-2 flex items-center gap-8'>
						<OrderDetails
							itemsNumber={orderItemsNumber}
							createdAt={order.createdAt}
							updatedAt={
								order.status === ORDER_STATUS.processing
									? undefined
									: order.updatedAt
							}
						/>
					</div>

					<ul className='border-gray-40 flex flex-col items-center gap-6 border-t pt-6'>
						{order.orderItems.map(item => (
							<OrderItem
								key={item._id}
								{...item}
							/>
						))}
					</ul>
				</Card>

				<div className='max-w-[380px]'>
					{order.status !== ORDER_STATUS.cancelled && (
						<OrderTracker status={order.status} />
					)}
					<OrderSummary order={order} />

					{order.status === ORDER_STATUS.processing && (
						<div className='border-orange-80 bg-orange-40 typography-R13 mt-6 rounded-[12px] border p-4 text-orange-600'>
							<div className='mb-4 flex gap-2'>
								<CircleAlertIcon size={20} />
								<p>{t('cancelDesc')}</p>
							</div>
							<CancelOrderButton orderId={order._id} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
