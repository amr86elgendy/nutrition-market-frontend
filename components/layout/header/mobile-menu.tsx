import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import {
	MessageCircleQuestionIcon,
	SendToBackIcon,
	UserRoundPenIcon,
	CircleUserRoundIcon,
	LogOutIcon,
	MenuIcon,
} from 'lucide-react';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'components/ui/sheet';
import { Separator } from 'components/ui/separator';
import { LogoutButton } from 'features/auth/components/logout-button';

import type { TUser } from 'features/auth/types/user';
import { getCategories } from 'apis/server/category';
import { AUTH_ROUTES, PUBLIC_ROUTES } from 'constants/routes';
import { getCompanies } from 'apis/server/company';

function MobileNavLink({
	link,
}: {
	link: {
		label: string;
		to: string;
	};
}) {
	return (
		<SheetClose asChild>
			<Link href={link.to}>
				<li className='typography-R16 rounded-md px-2 py-4 text-green-800 hover:bg-green-50'>
					{link.label}
				</li>
			</Link>
		</SheetClose>
	);
}

export async function MobileMenu({ user }: { user?: TUser }) {
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
		{ label: t('home'), to: PUBLIC_ROUTES.home },
		{ label: t('shop'), to: PUBLIC_ROUTES.shop },
		{ label: t('offers'), to: PUBLIC_ROUTES.offers },
		{
			label: t('categories'),
			to: PUBLIC_ROUTES.categories,
			children: categories,
		},
		{ label: t('brands'), to: PUBLIC_ROUTES.companies, children: companies },
	];

	const dropDownLinks = [
		{
			label: t('myProfile'),
			to: '/profile',
			Icon: UserRoundPenIcon,
		},
		{
			label: t('myOrders'),
			to: '/orders',
			Icon: SendToBackIcon,
		},
		{
			label: t('needHelp'),
			to: '/orders',
			Icon: MessageCircleQuestionIcon,
		},
	];
	return (
		<Sheet>
			<SheetTrigger className='relative flex items-center gap-2 text-green-500'>
				<MenuIcon className='text-green-500' />
			</SheetTrigger>

			<SheetContent className='flex w-full flex-col'>
				<SheetHeader className='border-gray-40 border-b pb-4'>
					<SheetTitle>{t('menu')}</SheetTitle>
				</SheetHeader>

				<ul>
					{mainLinks.map(link => {
						return (
							<MobileNavLink
								key={link.label}
								link={link}
							/>
						);
					})}
				</ul>

				<Separator className='bg-gray-40' />
				<ul>
					{user ? (
						<>
							{dropDownLinks.map(link => (
								<SheetClose
									key={link.label}
									asChild>
									<Link href={link.to}>
										<li className='typography-R16 flex items-center gap-2 rounded-md px-2 py-4 text-green-800 hover:bg-green-50'>
											<link.Icon className='text-green-500' />
											{link.label}
										</li>
									</Link>
								</SheetClose>
							))}
							<SheetClose className='w-full'>
								<LogoutButton className='typography-R16 gap-2 rounded-md px-2 py-4 text-green-800 hover:bg-green-50'>
									<LogOutIcon className='text-green-500' />
									{t('logout')}
								</LogoutButton>
							</SheetClose>
						</>
					) : (
						<SheetClose asChild>
							<Link href={AUTH_ROUTES.login}>
								<li className='typography-R16 flex items-center gap-2 rounded-md px-2 py-4 text-green-800 hover:bg-green-50'>
									<CircleUserRoundIcon className='text-green-500' />
									{t('login')}
								</li>
							</Link>
						</SheetClose>
					)}
				</ul>
			</SheetContent>
		</Sheet>
	);
}
