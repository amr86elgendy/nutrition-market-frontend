import { cn } from 'lib/utils';

export function LoadingDots({
	className,
	color,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('flex items-center justify-center gap-[2px]', className)}
			{...props}>
			{[0, 0, 0].map((_, i) => {
				return (
					<div
						key={i}
						className={cn(
							'size-1 animate-bounce rounded-full bg-gray-400',
							color
						)}
						style={{
							transitionDelay: `${i * 100}ms`,
							animationDelay: `${i * 100}ms`,
						}}
					/>
				);
			})}
		</div>
	);
}
