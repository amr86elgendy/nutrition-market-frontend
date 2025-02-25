import { CardItemSkeleton } from 'features/products/components/card-item/skeleton';

export function ProductsLoading({ number = 6 }: { number?: number }) {
	return (
		<div className='media-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] media-sm:gap-4 grid grid-cols-2 gap-2 self-baseline overflow-hidden'>
			{Array.from({ length: number }).map((el, i) => (
				<CardItemSkeleton key={i} />
			))}
		</div>
	);
}
