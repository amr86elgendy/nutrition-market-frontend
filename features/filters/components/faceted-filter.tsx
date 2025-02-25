'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import { Checkbox } from 'components/ui/checkbox';
import { Button } from 'components/ui/button';

type TFacetedFilter = {
	title: string;
	value: string;
	options: {
		label: string;
		value: string;
	}[];
};

export function FacetedFilter({ title, value, options }: TFacetedFilter) {
	const router = useRouter();
	const searchParams = new URLSearchParams(useSearchParams());

	const t = useTranslations('Filter');

	const facet = searchParams.getAll(value);
	return (
		<AccordionItem value={value}>
			<AccordionTrigger className='typography-M14'>{title}</AccordionTrigger>
			<AccordionContent className='space-y-2'>
				{options?.map(option => {
					return (
						<div
							key={option.label}
							className='typography-R13 has-data-[state=checked]:typography-SB13 flex items-center gap-2 text-gray-400 has-data-[state=checked]:text-black'>
							<Checkbox
								id={option.label}
								onCheckedChange={checked => {
									if (checked) {
										searchParams.append(value, option.value);
									} else {
										searchParams.delete(value, option.value);
									}
									if (searchParams.get('page')) {
										searchParams.set('page', '1');
									}
									router.push(`?${searchParams.toString()}`);
								}}
								checked={facet.includes(option.value)}
							/>
							<label
								htmlFor={option.label}
								className='inline-block cursor-pointer'>
								<span className='capitalize'>{option.label}</span>
							</label>
						</div>
					);
				})}
				{facet.length > 0 && (
					<Button
						variant='secondary-destructive'
						size='sm'
						className='w-full text-xs text-red-500'
						onClick={() => {
							searchParams.delete(value);
							router.push(`?${searchParams.toString()}`);
						}}>
						{t('clear')}
					</Button>
				)}
			</AccordionContent>
		</AccordionItem>
	);
}
