'use client';

import { useState } from 'react';
import { Counter } from 'components/utils/counter';
import { AddToCartButton } from 'components/utils/add-to-cart-btn';

export default function ActionBtns({
	productId,
	companyId,
	variantId,
	quantity,
}: {
	productId: string;
	companyId: string;
	variantId: string;
	quantity: number;
}) {
	const [count, setCount] = useState<number>(1);

	const increaseByOne = () => {
		if (count === quantity) return;
		setCount(prev => prev + 1);
	};
	const decreaseByOne = () => {
		if (count === 1) return;
		setCount(prev => prev - 1);
	};

	const resetCount = () => {
		setCount(1);
	};

	return (
		<div className='media-md:w-[80%] mt-auto flex gap-2'>
			<AddToCartButton
				quantity={quantity}
				resetCount={resetCount}
				amount={count}
				productId={productId}
				companyId={companyId}
				variantId={variantId}
			/>

			<Counter
				count={count}
				increaseByOne={increaseByOne}
				decreaseByOne={decreaseByOne}
			/>
		</div>
	);
}
