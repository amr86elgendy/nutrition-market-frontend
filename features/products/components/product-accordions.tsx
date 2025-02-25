import parse from 'html-react-parser';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import { NutritionFacts } from 'features/products/components/nutrition-facts';
import {
	Calendar,
	Circle,
	CircleAlert,
	CircleCheck,
	PillBottleIcon,
	RefrigeratorIcon,
} from 'lucide-react';
import type { TProductWithMultipleVariants } from 'features/products/types/product';

const accordionToDisplay = [
	{
		Icon: CircleCheck,
		displayName: 'Description',
		name: 'description',
	},
	{
		Icon: Calendar,
		displayName: 'How to use',
		name: 'directionOfUse',
	},
	{
		Icon: CircleAlert,
		displayName: 'Warnings',
		name: 'warnings',
	},
	{
		Icon: RefrigeratorIcon,
		displayName: 'Storage condition',
		name: 'storageConditions',
	},
	{
		Icon: PillBottleIcon,
		displayName: 'Nutrition facts',
		name: 'nutritionFacts',
	},
] as const;

export function ProductAccordions({
	product,
}: {
	product: TProductWithMultipleVariants;
}) {
	return (
		<Accordion
			type='multiple'
			className='mb-4 w-full'>
			{accordionToDisplay.map(category => {
				if (!product[category.name]) return;

				return (
					<AccordionItem
						key={category.name}
						value={category.name}>
						<AccordionTrigger className='typography-B16'>
							<span className='text flex items-center gap-2'>
								<category.Icon
									size={20}
									strokeWidth={1.5}
								/>

								{category.displayName}
							</span>
						</AccordionTrigger>
						<AccordionContent className='typography-R16 leading-6 [&>ul]:ms-6 [&>ul]:list-disc'>
							{category.name === 'nutritionFacts' ? (
								<NutritionFacts nutritionFacts={product.nutritionFacts} />
							) : (
								parse(product[category.name])
							)}
						</AccordionContent>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
