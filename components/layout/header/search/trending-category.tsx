import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getTopSellingCategories } from 'apis/server/category';
import { Button } from 'components/ui/button';
import { Skeleton } from 'components/ui/skeleton';

export function TrendingCategory() {
	const { data, isPending } = useQuery({
		queryKey: ['top-selling-catgeories'],
		queryFn: () => getTopSellingCategories({ limit: 8 }),
		placeholderData: previousData => previousData,
	});

	return (
		<div className='bg-white p-4'>
			<h6 className='typography-SB13 mb-4 text-gray-200'>Trending</h6>
			{isPending ? (
				<div className='flex flex-wrap items-center gap-2'>
					{[40, 20, 25, 15, 22.5, 19].map(el => (
						<Skeleton
							key={el}
							style={{ width: 110 + el }}
							className='h-10'
						/>
					))}
				</div>
			) : (
				<div className='flex flex-wrap items-center gap-2'>
					{data?.categories?.map(cat => (
						<Button
							key={cat._id}
							asChild
							variant='outline'
							className='border-gray-40 rounded-md border px-4 py-1 text-gray-500'>
							<Link href={`/categories/${cat.category.slug}`}>
								{cat.category.name}
							</Link>
						</Button>
					))}
				</div>
			)}
		</div>
	);
}
