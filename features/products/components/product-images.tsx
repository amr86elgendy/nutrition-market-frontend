'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { TImage } from 'features/products/types/image';

type Images = TImage['image'][];

export function ProductImages({ images }: { images: Images }) {
	const primaryImage = images[0];

	const [displayedPhoto, setDisplayedPhoto] =
		useState<Images[number]>(primaryImage);

	useEffect(() => {
		setDisplayedPhoto(primaryImage);
	}, [primaryImage]);

	return (
		<div className='flex flex-col gap-4 border-b border-gray-50 pb-10'>
			<div className='aspect-square w-full max-w-[500px] content-center self-center'>
				<Image
					width={500}
					height={500}
					className='h-full w-full object-contain pt-4'
					alt='Product image'
					src={displayedPhoto.url}
				/>
			</div>
			<div className='flex w-full gap-2 self-start'>
				{images?.map(image => (
					<div
						key={image._id}
						className={`size-[90px] cursor-pointer overflow-hidden rounded-md border p-2 ${
							image._id === displayedPhoto._id
								? 'border-green-400'
								: 'border-gray-50'
						}`}
						onClick={() => {
							setDisplayedPhoto(image);
						}}>
						<Image
							width={80}
							height={80}
							className='h-full w-full object-contain'
							src={image.url}
							alt='Another product photo'
						/>
					</div>
				))}
			</div>
		</div>
	);
}
