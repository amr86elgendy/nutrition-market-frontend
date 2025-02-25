'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselProps } from 'components/ui/carousel';

export default function CarouselWrapper(
	props: React.HTMLAttributes<HTMLDivElement> & CarouselProps
) {
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 3000,
				}),
			]}
			{...props}
			dir='ltr'>
			{props.children as React.ReactNode}
		</Carousel>
	);
}
