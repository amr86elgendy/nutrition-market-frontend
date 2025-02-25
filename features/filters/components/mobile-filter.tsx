import { Suspense } from 'react';
import { getLocale } from 'next-intl/server';
import { FilterIcon } from 'lucide-react';

import { Button } from 'components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetHeader,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from 'components/ui/sheet';
import { ClearAllBtn } from './clear-all-btn';
import {
	Accordion,
	AccordionTrigger,
	AccordionItem,
	AccordionContent,
} from 'components/ui/accordion';
import { FacetedFilter } from './faceted-filter';
import { InputsFacet } from './price-inputs-facet';
import { RatingStarsFacet } from './rating-stars-facet';

import { getCompanies } from 'apis/server/company';
import { getCategories } from 'apis/server/category';
import { getDosageForms } from 'apis/server/dosageForm';

export async function MobileFilter() {
	const [companies, categories, dosageForms] = await Promise.all([
		getCompanies(),
		getCategories(),
		getDosageForms(),
	]);
	const locale = await getLocale();
	const FilterKeys = {
		company: 'company',
		dosageForm: 'dosageForm',
		category: 'category',
		price: 'price',
		averageRating: 'averageRating',
	} as const;
	return (
		<Sheet>
			<SheetTrigger
				asChild
				className='media-md:hidden relative flex items-center gap-2 text-green-500'>
				<Button
					variant='secondary-gray'
					size='icon'>
					<FilterIcon className='shrink-0' />
				</Button>
			</SheetTrigger>

			<SheetContent className='flex w-full flex-col'>
				<SheetHeader className='border-gray-40 flex-row items-center justify-between border-b pb-4'>
					<SheetTitle>Filters</SheetTitle>
					<ClearAllBtn />
				</SheetHeader>
				<article className='media-md:hidden h-full overflow-x-hidden overflow-y-auto border-gray-50'>
					<Accordion
						defaultValue={Object.keys(FilterKeys)}
						type='multiple'
						className='w-full [&>*:last-child]:border-0'>
						<Suspense>
							<FacetedFilter
								title='Company'
								value={FilterKeys.company}
								options={
									companies?.companies.map(c => ({
										label: locale === 'ar' ? c.name_ar : c.name_en,
										value: c.slug,
									})) ?? []
								}
							/>
							<FacetedFilter
								title='Dosage form'
								value={FilterKeys.dosageForm}
								options={
									dosageForms?.dosageForms.map(f => ({
										label: locale === 'ar' ? f.name_ar : f.name_en,
										value: f.slug,
									})) ?? []
								}
							/>

							<FacetedFilter
								title='Category'
								value={FilterKeys.category}
								options={
									categories?.categories.map(c => ({
										label: locale === 'ar' ? c.name_ar : c.name_en,
										value: c.slug,
									})) ?? []
								}
							/>
						</Suspense>

						<AccordionItem value={FilterKeys.averageRating}>
							<AccordionTrigger className='typography-M14'>
								Ratings
							</AccordionTrigger>
							<AccordionContent className='space-y-2'>
								<Suspense>
									<RatingStarsFacet />
								</Suspense>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value={FilterKeys.price}>
							<AccordionTrigger className='typography-M14'>
								Price
							</AccordionTrigger>
							<AccordionContent className='space-y-2'>
								<Suspense>
									<InputsFacet />
								</Suspense>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</article>
				<SheetClose asChild>
					<Button className='w-full'>See results</Button>
				</SheetClose>
			</SheetContent>
		</Sheet>
	);
}
