import { PAYMENT_METHODS, TOrderStatus } from 'constants/index';
import type { TAddress } from 'features/addresses/types/address';
import type { TVariant } from 'features/products/types/product';

export type TOrderItem = {
	_id: string;
	product: string;
	amount: number;
	totalProductPrice: string;
	totalProductPriceAfterCoupon: string;
	variant: TVariant;
};

export type TOrder = {
	_id: string;
	shippingAddress: TAddress;
	user: string;
	orderItems: TOrderItem[];
	paid: boolean;
	shippingFee: number;
	subtotal: number;
	paymentMethod: {
		id: string;
		name: (typeof PAYMENT_METHODS)[number];
		_id: string;
	};
	total: number;
	status: TOrderStatus;
	deliveredAt: string;
	createdAt: string;
	updatedAt: string;
};
