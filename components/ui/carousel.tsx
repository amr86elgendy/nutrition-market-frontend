'use client';
import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {
	type EmblaCarouselType as CarouselApi,
	type EmblaOptionsType as CarouselOptions,
	type EmblaPluginType as CarouselPlugin,
} from 'embla-carousel';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from 'lib/utils';
import { Button } from './button';

export type CarouselProps = {
	opts?: CarouselOptions;
	plugins?: CarouselPlugin[];
	orientation?: 'horizontal' | 'vertical';
	setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	scrollTo: (index: number) => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	scrollSnaps: number[];
	selectedIndex: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />');
	}

	return context;
}

const Carousel = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
	(
		{
			orientation = 'horizontal',
			opts,
			setApi,
			plugins,
			className,
			children,
			...props
		},
		ref
	) => {
		const [carouselRef, api] = useEmblaCarousel(
			{
				...opts,
				axis: orientation === 'horizontal' ? 'x' : 'y',
			},
			plugins
		);
		const [canScrollPrev, setCanScrollPrev] = React.useState(false);
		const [canScrollNext, setCanScrollNext] = React.useState(false);
		const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
		const [selectedIndex, setSelectedIndex] = React.useState(0);

		const onSelect = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}
			setSelectedIndex(api.selectedScrollSnap());
			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
		}, []);

		const onInit = React.useCallback((api: CarouselApi) => {
			if (!api) {
				return;
			}
			setScrollSnaps(api.scrollSnapList());
		}, []);

		const scrollPrev = React.useCallback(() => {
			api?.scrollPrev();
		}, [api]);

		const scrollTo = React.useCallback(
			(index: number) => {
				api?.scrollTo(index);
			},
			[api]
		);

		const scrollNext = React.useCallback(() => {
			api?.scrollNext();
		}, [api]);

		const handleKeyDown = React.useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					scrollPrev();
				} else if (event.key === 'ArrowRight') {
					event.preventDefault();
					scrollNext();
				}
			},
			[scrollPrev, scrollNext]
		);

		React.useEffect(() => {
			if (!api || !setApi) {
				return;
			}

			setApi(api);
		}, [api, setApi]);

		React.useEffect(() => {
			if (!api) {
				return;
			}
			onInit(api);
			onSelect(api);
			api.on('reInit', onSelect);
			api.on('select', onSelect);

			return () => {
				api?.off('select', onSelect);
			};
		}, [api, onInit, onSelect]);

		return (
			<CarouselContext.Provider
				value={{
					carouselRef,
					api,
					opts,
					orientation:
						orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
					scrollPrev,
					scrollNext,
					scrollTo,
					canScrollPrev,
					canScrollNext,
					scrollSnaps,
					selectedIndex,
				}}>
				<div
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn('relative', className)}
					role='region'
					aria-roledescription='carousel'
					{...props}>
					{children}
				</div>
			</CarouselContext.Provider>
		);
	}
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div
			ref={carouselRef}
			className='overflow-hidden rounded-md'>
			<div
				ref={ref}
				className={cn(
					'flex',
					orientation === 'horizontal' ? '-ms-4' : '-mt-4 flex-col',
					className
				)}
				{...props}
			/>
		</div>
	);
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { orientation } = useCarousel();

	return (
		<div
			ref={ref}
			role='group'
			aria-roledescription='slide'
			className={cn(
				'min-w-0 shrink-0 grow-0 basis-full',
				orientation === 'horizontal' ? 'ps-4' : 'pt-4',
				className
			)}
			{...props}
		/>
	);
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				'absolute h-8 w-8 rounded-full',
				orientation === 'horizontal'
					? '-start-12 top-1/2 -translate-y-1/2'
					: 'start-1/2 -top-12 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}>
			<ArrowLeft className='h-4 w-4' />
			<span className='sr-only'>Previous slide</span>
		</Button>
	);
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			ref={ref}
			variant={variant}
			size={size}
			className={cn(
				'absolute h-8 w-8 rounded-full',
				orientation === 'horizontal'
					? '-end-12 top-1/2 -translate-y-1/2'
					: 'start-1/2 -bottom-12 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}>
			<ArrowRight className='h-4 w-4' />
			<span className='sr-only'>Next slide</span>
		</Button>
	);
});
CarouselNext.displayName = 'CarouselNext';

const CarouselDots = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { scrollTo, scrollSnaps, selectedIndex } = useCarousel();

	return (
		<div
			ref={ref}
			className={cn(
				'absolute start-1/2 bottom-16 flex -translate-x-1/2 items-center justify-center gap-2',
				className
			)}
			{...props}>
			{scrollSnaps.map((_, i) => (
				<div
					key={i}
					onClick={() => scrollTo(i)}
					className={`h-2 w-2 rounded-full ${
						selectedIndex === i ? 'bg-green-500' : 'bg-green-100'
					}`}
				/>
			))}
		</div>
	);
});

CarouselDots.displayName = 'CarouselDots';

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
	CarouselDots,
};
