import Link from 'next/link';
import { useLocale } from 'next-intl';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'components/ui/tooltip';
import { Button } from 'components/ui/button';

import type {
	TProductWithMultipleVariants,
	TVariant,
} from 'features/products/types/product';
import type { TSearchParams } from 'types/searchparams';
import { cn } from 'lib/utils';

type TOptions = {
	[key: string]: {
		[key: string]: string[];
	};
};

const addVariantToOptions = (
	key: string,
	variantId: string,
	options: TOptions[number]
) => {
	if (!options[key]) {
		options[key] = [variantId];
	} else {
		options[key].push(variantId);
	}
};

export function ProductOptions({
	product,
	currentVariant,
	searchParams,
}: {
	product: TProductWithMultipleVariants;
	currentVariant: TVariant;
	searchParams: TSearchParams;
}) {
	const locale = useLocale();
	const options: TOptions = {
		count: {},
		flavor: {},
	};

	product.variants.forEach(variant => {
		const { flavor_en, flavor_ar, unitCount, _id } = variant;

		addVariantToOptions(
			locale === 'ar' ? flavor_ar : flavor_en,
			_id,
			options.flavor
		);
		addVariantToOptions(`${unitCount}`, _id, options.count);
	});

	const selectedOptions = {
		count: {
			option: currentVariant.unitCount,
			otherVariantHasSameOption: options.count[currentVariant.unitCount],
		},
		flavor: {
			option:
				locale === 'ar' ? currentVariant.flavor_ar : currentVariant.flavor_en,
			otherVariantHasSameOption:
				options.flavor[
					locale === 'ar' ? currentVariant.flavor_ar : currentVariant.flavor_en
				],
		},
	} as const;

	function setVariant(variantId: string) {
		if (!variantId) {
			manipulatedSp.delete('variant');
		} else {
			manipulatedSp.set('variant', variantId);
		}
		return `?${manipulatedSp.toString()}`;
	}

	const manipulatedSp = new URLSearchParams(searchParams);

	return Object.entries(options).map(([category, optionsObject]) => {
		const hasOptions = Object.keys(optionsObject).some(key => key);
		if (!hasOptions) return null;

		const oppositCategory = category === 'flavor' ? 'count' : 'flavor';
		return (
			<div
				className='mb-4'
				key={category}>
				<h6 className='typography-SB14 mb-2 capitalize'>{category}</h6>
				<div className='flex items-center gap-[8px]'>
					{Object.entries(optionsObject).map(([option, variantsIds]) => {
						const similarId = variantsIds.find(id =>
							selectedOptions[
								oppositCategory
							]?.otherVariantHasSameOption?.includes(id)
						);

						return (
							<TooltipProvider key={option}>
								<Tooltip
									open={!similarId ? undefined : false}
									delayDuration={0}>
									<TooltipTrigger asChild>
										<Button
											asChild
											variant={
												variantsIds.includes(currentVariant._id)
													? 'ghost-green'
													: 'outline'
											}
											className={cn(
												!similarId &&
													'bg-gray-30 text-gray-90 hover:bg-gray-30 border-0'
											)}>
											<Link
												prefetch
												scroll={false}
												href={setVariant(similarId ?? variantsIds[0])}>
												{option}
											</Link>
										</Button>
									</TooltipTrigger>
									<TooltipContent className='typography-R12 bg-[#5e548e]'>
										Available on other {oppositCategory}
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						);
					})}
				</div>
			</div>
		);
	});
}
