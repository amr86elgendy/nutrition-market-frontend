'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';
import { forwardRef, type ReactNode } from 'react';

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {
	prefixIcon?: ReactNode;
	suffexIcon?: ReactNode;
}

const inputVariants = cva(
	'text-N500 w-full placeholder:text-gray-100 rounded-md border-[1px] px-3 gap-2 outline-hidden outline-[1.5px] -outline-offset-[1.5px] transition-all placeholder:typography-R14 focus-within:outline-green-300 hover:border-gray-40 focus:outline-green-300 focus-visible:border-green-300 disabled:bg-gray-20 disabled:placeholder:text-gray-50 disabled:border-gray-40 flex truncate ',
	{
		variants: {
			variant: {
				outline: 'border-gray-50 hover:border-gray-70',
				fill: 'border-gray-20 bg-gray-20',
			},
			size: {
				xs: 'h-[36px]',
				sm: 'h-[40px]',
				md: 'h-[44px]',
				lg: 'h-[48px]',
			},
		},
		defaultVariants: {
			variant: 'fill',
			size: 'lg',
		},
	}
);

const TextField = forwardRef<HTMLInputElement, InputProps>(
	({ size, variant, className, prefixIcon, suffexIcon, ...props }, ref) => {
		return (
			<div className={cn(inputVariants({ variant, size, className }))}>
				{prefixIcon && (
					<div className='flex items-center justify-center text-gray-200'>
						{prefixIcon}
					</div>
				)}
				<input
					ref={ref}
					className='h-full w-full border-none bg-[transparent] outline-hidden'
					{...props}
				/>
				{suffexIcon && (
					<div className='flex items-center justify-center text-gray-200'>
						{suffexIcon}
					</div>
				)}
			</div>
		);
	}
);

TextField.displayName = 'TextField';

export { TextField };
