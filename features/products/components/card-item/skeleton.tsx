import { Skeleton } from 'components/ui/skeleton';

export function CardItemSkeleton() {
	return (
		<div className='border-gray-40 media-md:p-4 h-full animate-pulse rounded-md border bg-white p-6'>
			<Skeleton className='mb-4 h-36 w-full' />
			<Skeleton className='mb-2 h-5 w-[90%]' />
			<Skeleton className='mb-6 h-4 w-[30%]' />
			<Skeleton className='h-5 w-[30%]' />
		</div>
	);
}
