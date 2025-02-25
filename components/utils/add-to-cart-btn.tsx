'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Button, buttonVariants } from 'components/ui/button';
import { Check, Circle, CircleX } from 'lucide-react';
import { useToast } from 'components/ui/use-toast';
import { cn } from 'lib/utils';
import { VariantProps } from 'class-variance-authority';
import { addItemToCart } from 'features/cart/apis/cart';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	quantity: number;
	resetCount?: () => void;
	productId: string;
	companyId: string;
	variantId?: string;
	amount?: number;
}

export const AddToCartButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			quantity,
			resetCount,
			productId,
			companyId,
			variantId,
			amount = 1,
			className,
			...props
		},
		ref
	) => {
		const { toast } = useToast();
		const [isAddedEnd, setIsAddedEnd] = useState(false);
		const { execute, isExecuting, hasSucceeded } = useAction(addItemToCart, {
			onSuccess: () => {
				resetCount?.();
			},
			onError: ({ error }) => {
				toast({
					variant: 'destructive',
					title: 'Server Error',
					description: error.serverError,
				});
			},
		});

		useEffect(() => {
			setIsAddedEnd(false);
			if (hasSucceeded) {
				const id = setTimeout(() => setIsAddedEnd(true), 2000);

				return () => {
					clearTimeout(id);
				};
			}
		}, [hasSucceeded]);

		if (quantity === 0) {
			return (
				<Button
					disabled
					variant='secondary-gray'
					className='relative w-full flex-1 gap-2 text-red-500 capitalize'>
					<CircleX size={16} />
					Out of stock
				</Button>
			);
		}

		return (
			<Button
				ref={ref}
				onClick={() => {
					if (isExecuting) return;
					execute({ amount, productId, companyId, variantId: variantId ?? '' });
				}}
				type='submit'
				className={cn(
					'relative mt-auto w-full justify-center self-end capitalize',
					className,
					(isExecuting || (hasSucceeded && !isAddedEnd)) &&
						'pointer-events-auto visible opacity-100'
				)}
				{...props}>
				{isExecuting ? (
					<Circle
						size={10}
						fill='white'
						className='animate-bounced'
					/>
				) : hasSucceeded && !isAddedEnd ? (
					<Check
						size={20}
						className='absolute'
					/>
				) : (
					<span>add to cart</span>
				)}
			</Button>
		);
	}
);

AddToCartButton.displayName = 'AddToCartButton';
