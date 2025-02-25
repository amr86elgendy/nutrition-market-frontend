export const Sale = ({
	price,
	priceAfterDiscount,
}: {
	price: number;
	priceAfterDiscount: number;
}) => {
	if (!priceAfterDiscount) return null;
	return (
		<div className='typography-R12 absolute rounded-r-full bg-red-500 px-3 text-white'>
			<p>{(((price - priceAfterDiscount) / price) * 100).toFixed()}%</p>
		</div>
	);
};
