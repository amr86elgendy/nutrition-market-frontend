import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary: ' bg-green-500 text-white hover:bg-green-500/90',
				destructive: ' bg-red-500 text-white hover:bg-red-500/90',

				'secondary-white': ' bg-white hover:bg-gray-30',
				'secondary-gray': ' bg-gray-30 hover:bg-gray-50',
				'secondary-destructive': ' text-red-500 bg-red-30 hover:bg-red-50',
				'secondary-green': ' text-green-500 bg-green-100 hover:bg-green-150',

				outline:
					'border border-gray-50 shadow-xs hover:border-gray-80 text-gray-500',

				'ghost-green': 'border border-green-500 text-green-500',

				link: 'text-green-500 underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
