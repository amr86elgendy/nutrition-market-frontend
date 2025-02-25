import type { TProductWithSingleVariant } from 'features/products/types/product';
import { OtherIngredients } from './other-ingredients';

export function NutritionFacts({
	nutritionFacts,
}: {
	nutritionFacts: TProductWithSingleVariant['nutritionFacts'];
}) {
	const mapperName = {
		amountPerServing: 'Amount Per Serving',
		dailyValue: 'Daily value (%)',
	};

	const ingColumns = Object.keys(nutritionFacts.ingredients[0]);

	return (
		<>
			<table className='mb-4 w-full'>
				<tbody className='[&>*:nth-child(odd)]:bg-gray-20'>
					<tr className='border border-x-0 border-t-0 border-gray-50'>
						{ingColumns
							.filter(col => col !== '_id')
							.map(key => (
								<th
									key={key}
									className='typography-SB14 p-2 text-start'>
									{mapperName[key as keyof typeof mapperName]}
								</th>
							))}
					</tr>
					{nutritionFacts.ingredients.map(ing => {
						return (
							<tr
								className='border border-x-0 border-b-0 border-gray-50'
								key={ing.name}>
								{Object.entries(ing)
									.filter(([col]) => col !== '_id')
									.map(([_, value]) => (
										<td
											className='typography-R14 p-2 first:w-1/3'
											key={value}>
											{value}
										</td>
									))}
							</tr>
						);
					})}
				</tbody>
			</table>
			<OtherIngredients otherIngredients={nutritionFacts.otherIngredients} />
		</>
	);
}
