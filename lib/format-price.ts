export const formatPrice = (price: number) => {
	const formatter = new Intl.NumberFormat('en-US', {
		maximumFractionDigits: 0,
	});

	return formatter.format(price);
};
