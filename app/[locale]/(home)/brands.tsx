import Link from 'next/link';
import parse from 'html-react-parser';
import { getLocale, getTranslations } from 'next-intl/server';

import BuildingPlaceholder from 'assets/icons/building-placeholder';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { getPopularCompanies } from 'apis/server/company';
import SectionWrapper from './section-wrapper';

export default async function Brands() {
	const { companies } = await getPopularCompanies({ limit: 5 });
	const t = await getTranslations('HomePage');
	const locale = await getLocale();
	return (
		<SectionWrapper
			title={t('popularBrands.title')}
			description={t('popularBrands.description')}
			href='/companies'>
			<div
				className='media-md:divide-none grid gap-4 divide-y divide-gray-50 self-baseline overflow-hidden rounded-md border border-gray-50 px-4'
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
				}}>
				{companies.map(company => (
					<div
						key={company._id}
						className='flex gap-4 py-4'>
						<Avatar className='size-20 rounded-md'>
							<AvatarImage src={company.logo?.url} />
							<AvatarFallback className='bg-gray-30 rounded-md text-gray-100'>
								<BuildingPlaceholder />
							</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<Link
								href={`/companies/${company.slug}`}
								className='typography-SB16 mb-1 hover:underline'>
								{locale === 'ar' ? company.name_ar : company.name_en}{' '}
								<span className='typography-R16 text-gray-200'>
									({company.productsCount})
								</span>
							</Link>
							<span className='typography-R14 line-clamp-2 text-gray-200'>
								{parse(
									locale === 'ar'
										? company.description_ar
										: company.description_en
								)}
							</span>
						</div>
					</div>
				))}
			</div>
		</SectionWrapper>
	);
}
