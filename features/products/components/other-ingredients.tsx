import type { TProductWithSingleVariant } from 'features/products/types/product';

export function OtherIngredients({
	otherIngredients,
}: {
	otherIngredients: TProductWithSingleVariant['nutritionFacts']['otherIngredients'];
}) {
	return (
		<p className='typography-B13 shrink-0'>
			Other Ingredients:{' '}
			<span className='typography-R13'>
				{otherIngredients.map(ing => ing.name).join(', ')}
			</span>
		</p>
	);
}
