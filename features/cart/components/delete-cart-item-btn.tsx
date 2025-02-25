'use client';

import React from 'react';
import { cn } from 'lib/utils';
import { X } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useAction } from 'next-safe-action/hooks';

import { LoadingDots } from 'components/utils/loading-dots';
import { deleteItemFromCart } from 'features/cart/apis/cart';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	itemId: string;
}

export const DeleteCartItemBtn = React.forwardRef<
	HTMLButtonElement,
	ButtonProps
>(({ className, itemId, ...props }, ref) => {
	const locale = useLocale();
	const { execute: deleteCartItem, isPending } = useAction(deleteItemFromCart);
	return (
		<button
			{...props}
			ref={ref}
			onClick={() => {
				deleteCartItem({ itemId });
			}}
			className={cn(
				'absolute end-0 top-0 flex size-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white',
				{
					'-translate-x-1/2': locale === 'ar',
					'translate-x-1/2': locale === 'en',
				},
				className
			)}>
			{isPending ? <LoadingDots className='*:bg-white' /> : <X size={14} />}
		</button>
	);
});
DeleteCartItemBtn.displayName = 'DeleteCartItemBtn';
