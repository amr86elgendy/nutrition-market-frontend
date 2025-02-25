import { getTranslations } from 'next-intl/server';

import { getProducts } from 'features/products/apis';
import { CardItem } from 'features/products/components/card-item';
import SectionWrapper from './section-wrapper';

export default async function BestSellerProducts() {
	const products = await getProducts({
		sort: '-sold',
		limit: '5',
	});
	const t = await getTranslations('HomePage');
	return (
		<SectionWrapper
			title={t('bestSeller.title')}
			description={t('bestSeller.description')}
			href='/shop?sort=-sold'>
			<div className='media-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] media-sm:gap-4 grid grid-cols-2 gap-2 self-baseline overflow-hidden'>
				{products.products.map(product => (
					<CardItem
						key={product._id}
						{...product}
					/>
				))}
			</div>
		</SectionWrapper>
	);
}
