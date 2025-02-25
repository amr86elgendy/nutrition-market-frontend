import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';

import {
	CarouselContent,
	CarouselDots,
	CarouselItem,
} from 'components/ui/carousel';
import CarouselWrapper from './carousel-wrapper';
import { Button } from 'components/ui/button';

import { getHeroImages } from 'apis/server/hero';

export default async function Hero() {
	const { images } = await getHeroImages({ path: 'hero' });
	return (
		<CarouselWrapper
			className='container pt-10'
			opts={{ loop: true }}>
			<CarouselContent className='relative'>
				{images.map(img => (
					<CarouselItem
						key={img._id}
						className='relative h-[45vh] ps-0'>
						<div className='media-sm:p-16 absolute inset-0 container flex flex-col justify-center p-10'>
							<h3 className='mb-2 max-w-[20ch] text-[clamp(2rem,0.23rem+1.02vw,2rem)] leading-tight font-semibold text-green-700'>
								{img.title}
							</h3>
							<span className='mb-8 max-w-[40ch] text-[clamp(1rem,0.09rem+0.12vw,1.125rem)] opacity-80'>
								{parse(img.description)}
							</span>
							{img.relatedProduct && (
								<Button asChild>
									<Link
										className='self-start'
										href={`/shop/${img.relatedProduct}`}>
										Discover now
									</Link>
								</Button>
							)}
						</div>
						<Image
							alt=''
							src={img.image.url}
							className='h-full w-full object-cover object-top'
							width={2000}
							height={2000}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselDots className='-bottom-2 rounded-full bg-white px-2 py-1' />
		</CarouselWrapper>
	);
}
