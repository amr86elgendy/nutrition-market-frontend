'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from 'components/ui/button';
import { NumericField } from 'components/ui/numeric-field';
import { cn } from 'lib/utils';

export function InputsFacet() {
	const [from, setFrom] = useState<string>('');
	const [to, setTo] = useState<string>('');

	const t = useTranslations('Filter');

	const searchParams = useSearchParams();
	const manipulatedSearchParam = new URLSearchParams(searchParams);

	const priceUrl = manipulatedSearchParam.get('price');

	const router = useRouter();

	const swapValues = () => {
		setFrom(to);
		setTo(from);

		manipulatedSearchParam.set('price', `${to || '0'}-${from}`);
		router.push(`?${manipulatedSearchParam.toString()}`);
	};

	useEffect(() => {
		setFrom(priceUrl?.split('-')[0] ?? '');
		setTo(priceUrl?.split('-')[1] ?? '');
	}, [priceUrl]);

	const submitFilters = () => {
		if (!from && !to && priceUrl) {
			manipulatedSearchParam.delete('price');
			router.push(`?${manipulatedSearchParam.toString()}`);
		}

		if (!from && !to) return;

		if (priceUrl) {
			if (from && to && +from > +to) {
				swapValues();
				return;
			}

			manipulatedSearchParam.set('price', `${from || '0'}-${to || '0'}`);
		}

		if (from && to && +from > +to) {
			swapValues();
			return;
		}

		manipulatedSearchParam.set('price', `${from || '0'}-${to}`);
		manipulatedSearchParam.set('page', '1');
		router.push(`?${manipulatedSearchParam.toString()}`);
	};

	return (
		<div>
			<div className='mb-4 flex gap-4'>
				<div className='flex flex-col gap-[4px]'>
					<label
						htmlFor='from'
						className='typography-R13 text-gray-200'>
						{t('from')}
					</label>
					<NumericField
						id='from'
						value={from}
						changeHandler={numericValue => {
							setFrom(numericValue);
						}}
						className='h-[36px]'
					/>
				</div>
				<div className='flex flex-col gap-[4px]'>
					<label
						htmlFor='to'
						className='typography-R13 text-gray-200'>
						{t('to')}
					</label>
					<NumericField
						id='to'
						value={to}
						changeHandler={numericValue => {
							setTo(numericValue);
						}}
						className='h-[36px]'
					/>
				</div>
			</div>
			<div className={cn(priceUrl && 'grid grid-cols-[3fr_1fr] gap-2')}>
				<Button
					className='mb-2 w-full'
					size={'sm'}
					onClick={submitFilters}>
					{t('apply')}
				</Button>
				{priceUrl && (
					<Button
						variant='secondary-destructive'
						size='sm'
						className='w-full text-xs text-red-500'
						onClick={() => {
							manipulatedSearchParam.delete('price');
							router.push(`?${manipulatedSearchParam.toString()}`);
						}}>
						{t('clear')}
					</Button>
				)}
			</div>
		</div>
	);
}
