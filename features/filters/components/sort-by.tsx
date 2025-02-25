'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'components/ui/select';

export function SortBy() {
	const t = useTranslations('Filter');
	const SORT_OPTIONS = [
		{
			label: t('bestSellers'),
			value: '-sold',
		},
		{
			label: t('topRated'),
			value: '-averageRating',
		},
		{
			label: t('az'),
			value: 'name',
		},
		{
			label: t('za'),
			value: '-name',
		},
		{
			label: t('lth'),
			value: 'price',
		},
		{
			label: t('htl'),
			value: '-price',
		},
		{
			label: t('newOld'),
			value: '-createdAt',
		},
		{
			label: t('oldNew'),
			value: 'createdAt',
		},
	];
	const router = useRouter();
	const searchParams = new URLSearchParams(useSearchParams());
	const facet = searchParams.get('sort') ?? '';

	return (
		<article className='flex items-center gap-4'>
			<span className={'typography-M13 text-gray-100'}>{t('sortBy')} :</span>
			<Select
				value={facet}
				onValueChange={v => {
					searchParams.set('sort', v);
					router.push(`?${searchParams.toString()}`);
				}}>
				<SelectTrigger className='w-48'>
					<SelectValue placeholder={t('select')} />
				</SelectTrigger>
				<SelectContent>
					{SORT_OPTIONS.map(option => (
						<SelectItem
							key={option.value}
							value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</article>
	);
}
