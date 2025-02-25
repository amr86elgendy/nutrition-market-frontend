import * as React from 'react';

import { cn } from 'lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

export interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof inputVariants> {}

const inputVariants = cva(
	'text-N500 w-full placeholder:text-gray-100 rounded-md border-[1px] px-3 py-2.5 outline-none outline-[1.5px] -outline-offset-[1.5px] transition-all placeholder:typography-R14 focus-within:outline-green-300 hover:border-gray-40 focus:outline-green-300 focus-visible:border-green-300 disabled:bg-gray-20 disabled:placeholder:text-gray-50 disabled:border-gray-40',
	{
		variants: {
			variant: {
				outline: 'border-gray-50 hover:border-gray-70',
				fill: 'border-gray-20 bg-gray-20',
			},
			size: {
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

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, variant, size, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(inputVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };
