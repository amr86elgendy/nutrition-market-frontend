import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { icons } from './list';

export interface IconProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	name: keyof typeof icons;
	viewBox?: number;
}

const Icon = forwardRef<HTMLElement, IconProps>((props, ref) => {
	const { name, viewBox = 24, className, ...rest } = props;
	return (
		<i
			className={cn(`line-clamp-[1em] flex size-[24px]`, className)}
			{...rest}
			ref={ref}>
			<svg
				preserveAspectRatio='none'
				viewBox={`0 0 ${viewBox} ${viewBox}`}>
				<path
					fill='currentColor'
					d={icons[name]}
				/>
			</svg>
		</i>
	);
});
Icon.displayName = 'Icon';

export default Icon;
