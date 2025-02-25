import { cn } from 'lib/utils';
import * as React from 'react';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => (
		<textarea
			rows={4}
			className={cn(
				'text-N500 border-gray-20 bg-gray-20 placeholder:typography-R14 hover:border-gray-40 disabled:bg-gray-40 w-full rounded-md border-[1px] px-3 py-2.5 outline-hidden outline-[1.5px] -outline-offset-[1.5px] transition-all placeholder:text-gray-100 focus-within:outline-green-300 focus:outline-green-300 focus-visible:border-green-300 disabled:placeholder:text-gray-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
);
Textarea.displayName = 'Textarea';

export { Textarea };
