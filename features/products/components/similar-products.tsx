import React from 'react';
import Link from 'next/link';

import { getSimilarProducts } from 'features/products/apis';
import { CardItem } from 'features/products/components/card-item';

export default async function SimilarProducts({
	productId,
}: {
	productId: string;
}) {
	const { products } = await getSimilarProducts({ productId });

	return (
		<>
			<div className='mb-6 flex items-center justify-between'>
				<h3 className='typography-M16'>Related products</h3>
			</div>
			<div className='media-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] media-sm:gap-4 mb-10 grid grid-cols-2 gap-2'>
				{products.map(product => (
					<CardItem
						key={product._id}
						{...product}
					/>
				))}
			</div>
		</>
	);
}
