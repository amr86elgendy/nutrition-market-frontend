'use client';

import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LoaderCircleIcon, SearchIcon, XIcon } from 'lucide-react';

import { getProducts } from 'features/products/apis';

import { Input } from 'components/ui/input';
import { Separator } from 'components/ui/separator';
import { SearchList } from 'components/layout/header/search/search-list';
import { Overlay } from 'components/layout/header/search/overlay';
import { useGetBodyHeight } from 'components/layout/header/search/use-get-body-height';

import { useOutsideClick } from 'lib/use-outside-click';
import { cn } from 'lib/utils';
import useDebounce from 'lib/use-debounce';

export function Searchbar({ className }: { className?: string }) {
	const t = useTranslations('HomePage');
	const [isSearchListOpen, setIsSearchListOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const pathname = usePathname();
	const searchParam = useSearchParams();

	const bodyHeight = useGetBodyHeight({ enabled: isSearchListOpen });

	const ref = useOutsideClick(
		() => setIsSearchListOpen(false),
		isSearchListOpen
	);

	const debouncedValue = useDebounce(searchValue, 700);

	const closeSearchList = () => {
		setIsSearchListOpen(false);
	};

	const resetInput = () => {
		setSearchValue('');
	};

	useEffect(() => {
		if (!setIsSearchListOpen) return;
		closeSearchList();
		resetInput();
	}, [pathname, searchParam]);

	// const { data, isPlaceholderData, isFetching } = useQuery({
	// 	queryKey: ['products', debouncedValue],
	// 	queryFn: () => getProducts({ name: debouncedValue }),
	// 	enabled: !!debouncedValue,
	// 	placeholderData: previousData => previousData,
	// });

	return (
		<div className={cn('relative w-1/2 p-8', className)}>
			<div
				style={{ height: isSearchListOpen ? `${bodyHeight - 60}px` : 0 }}
				className={cn(
					'invisible absolute inset-0 *:visible',
					isSearchListOpen && 'visible'
				)}>
				<div
					ref={ref}
					className={cn(
						'absolute inset-x-0 z-20 rounded-md bg-white p-2',
						isSearchListOpen &&
							'max-media-md:top-28 max-media-md:-translate-y-24 sticky top-4 z-50'
					)}>
					<div className='relative'>
						<Input
							onChange={e => setSearchValue(e.target.value)}
							onFocus={() => setIsSearchListOpen(true)}
							value={searchValue}
							className='bg-gray-30 rounded-full'
							placeholder={t('searchbarPlaceholder')}
						/>
						<div className='absolute end-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center gap-2 text-green-500'>
							<div
								className={cn(
									'behavior-discrete hidden scale-0 items-center gap-2 transition-all',
									!!searchValue && 'flex scale-100 starting:scale-0'
								)}>
								{/* {isFetching ? (
									<LoaderCircleIcon
										size={20}
										className='animate-spin'
									/>
								) : (
									<XIcon
										onClick={resetInput}
										size={20}
									/>
								)} */}
								<Separator
									orientation='vertical'
									className='h-6 w-[1px]'
								/>
							</div>
							<SearchIcon size={20} />
						</div>
					</div>

					{/* {isSearchListOpen && (
						<SearchList
							isPlaceholderData={isPlaceholderData}
							searchValue={searchValue}
							debouncedValue={debouncedValue}
							products={data?.products}
						/>
					)} */}
				</div>
			</div>
			<Overlay isSearchListOpen={isSearchListOpen} />
		</div>
	);
}
