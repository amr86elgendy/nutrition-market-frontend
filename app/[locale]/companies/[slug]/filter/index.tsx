import { Suspense } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
// UI
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import { RatingStarsFacet } from 'features/filters/components/rating-stars-facet';
import { InputsFacet } from 'features/filters/components/price-inputs-facet';
import { FacetedFilter } from 'features/filters/components/faceted-filter';
import { ClearAllBtn } from 'features/filters/components/clear-all-btn';
// Utils
import { getCategories } from 'apis/server/category';
import { getDosageForms } from 'apis/server/dosageForm';

export default async function FilterProducts() {
	const [categories, dosageForms] = await Promise.all([
		getCategories(),
		getDosageForms(),
	]);

	const locale = await getLocale();
	const t = await getTranslations('Filter');

	const FilterKeys = {
		dosageForm: 'dosageForm',
		category: 'category',
		price: 'price',
		averageRating: 'averageRating',
	} as const;

	return (
		<article className='media-md:block hidden self-start rounded-lg border border-gray-50'>
			<div className='flex items-center justify-between border-b border-gray-50 p-4 pb-4 shadow-xs'>
				<h4 className='typography-B16 capitalize'>{t('filter')}</h4>
				<Suspense fallback='Loading..'>
					<ClearAllBtn />
				</Suspense>
			</div>

			<div className='h-[60vh] overflow-x-hidden overflow-y-auto p-4 pt-0'>
				<Accordion
					defaultValue={Object.keys(FilterKeys)}
					type='multiple'
					className='w-full [&>*:last-child]:border-0'>
					<Suspense>
						<FacetedFilter
							title={t('dosageForm')}
							value={FilterKeys.dosageForm}
							options={
								dosageForms?.dosageForms.map(f => ({
									label: locale === 'ar' ? f.name_ar : f.name_en,
									value: f.slug,
								})) ?? []
							}
						/>

						<FacetedFilter
							title={t('category')}
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
							{t('rating')}
						</AccordionTrigger>
						<AccordionContent className='space-y-2'>
							<Suspense>
								<RatingStarsFacet />
							</Suspense>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value={FilterKeys.price}>
						<AccordionTrigger className='typography-M14'>
							{t('price')}
						</AccordionTrigger>
						<AccordionContent className='space-y-2'>
							<Suspense>
								<InputsFacet />
							</Suspense>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</article>
	);
}
