import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import parse from 'html-react-parser';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from 'components/ui/navigation-menu';

import { cn } from 'lib/utils';
import { getCategories } from 'apis/server/category';
import { getCompanies } from 'apis/server/company';

export async function Linksbar() {
	const t = await getTranslations('HomePage.linksbar');
	const locale = await getLocale();
	const categoriesData = await getCategories();
	const categories = categoriesData.categories.map(cat => ({
		_id: cat._id,
		label: locale === 'ar' ? cat.name_ar : cat.name_en,
		description: locale === 'ar' ? cat.description_ar : cat.description_en,
		to: `/categories/${cat.slug}`,
	}));

	const companiesData = await getCompanies();
	const companies = companiesData.companies.map(com => ({
		_id: com._id,
		label: locale === 'ar' ? com.name_ar : com.name_en,
		description: locale === 'ar' ? com.description_ar : com.description_en,
		to: `/companies/${com.slug}`,
	}));

	const mainLinks = [
		{ label: t('home'), to: '/' },
		{ label: t('shop'), to: '/shop' },
		{ label: t('offers'), to: '/shop/offers' },
		{ label: t('categories'), to: '/categories', children: categories },
		{ label: t('brands'), to: '/companies', children: companies },
		{ label: t('blogs'), to: '/blogs' },
	];

	return (
		<div className='media-md:block sticky top-0 z-20 hidden border-b border-gray-50 bg-green-500'>
			<div className='container flex items-center'>
				<NavigationMenu>
					<NavigationMenuList>
						{mainLinks.map((link, idx, arr) => {
							if (link.children) {
								return (
									<NavigationMenuItem
										key={link.label}
										className='typography-M14 text-white hover:text-orange-700'>
										<NavigationMenuTrigger>
											<Link href={link.to}>{link.label}</Link>
										</NavigationMenuTrigger>

										<NavigationMenuContent
											className={cn('grid list-none gap-4 p-4', {
												'media-lg:grid-cols-3 grid-cols-2':
													arr[idx].children && arr[idx].children?.length < 13,
												'media-lg:grid-cols-4 grid-cols-3':
													arr[idx].children &&
													arr[idx].children?.length > 12 &&
													arr.length < 21,
												'media-lg:grid-cols-5 grid-cols-4':
													arr[idx].children && arr[idx].children?.length > 20,
											})}>
											{link.children?.map(child => {
												return (
													<li key={child._id}>
														<NavigationMenuLink asChild>
															<Link
																href={child.to}
																className={cn(
																	'hover:bg-gray-20 focus:bg-gray-20 block cursor-pointer space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none'
																)}>
																<div className='text-sm leading-none font-medium'>
																	{child.label}
																</div>
																<p className='line-clamp-2 text-xs leading-snug text-gray-100'>
																	{parse(child.description)}
																</p>
															</Link>
														</NavigationMenuLink>
													</li>
												);
											})}
										</NavigationMenuContent>
									</NavigationMenuItem>
								);
							} else {
								return (
									<NavigationMenuItem
										key={link.label} //[#bc6c25]
										className='typography-M14 text-white hover:text-orange-700'>
										<Link
											href={link.to}
											legacyBehavior
											passHref>
											<NavigationMenuLink
												className={navigationMenuTriggerStyle()}>
												{link.label}
												{link.label === t('offers') && (
													<span className='typography-R12 ms-2 rounded-full bg-red-500 px-2 text-white'>
														{t('upTo')} 50%
													</span>
												)}
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								);
							}
						})}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	);
}
