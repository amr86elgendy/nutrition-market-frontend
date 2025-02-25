import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { ProfileDropdown } from 'features/auth/components/profile-drop-down';
import { LoggedinBanner } from 'features/auth/components/loggedin-banner';
import biovacLogo from 'assets/logo.png';
import { CartSidebar } from './cartSidebar';
import { getMe } from 'features/auth/apis/user';
import { Searchbar } from './search/searchbar';
import { MobileMenu } from './mobile-menu';

import { AUTH_ROUTES } from 'constants/routes';

export async function Header() {
	const user = await getMe();
	const t = await getTranslations('Auth');
	const desktop = (
		<div className='media-md:flex container hidden items-center justify-between gap-2 py-4'>
			<Link
				href='/'
				className='ms-0 w-32 shrink-0'>
				<Image
					className='h-full w-full'
					alt='Biovac pharmacy supplements'
					src={biovacLogo}
					width={200}
				/>
			</Link>
			<Suspense>
				<Searchbar />
			</Suspense>
			<div className='text-black-3 flex items-center gap-6'>
				<CartSidebar />
				<Separator
					orientation='vertical'
					className='h-6'
				/>
				{user ? (
					<ProfileDropdown user={user} />
				) : (
					<Button
						asChild
						size='sm'>
						<Link href={AUTH_ROUTES.login}>{t('login')}</Link>
					</Button>
				)}
			</div>
		</div>
	);

	const mobile = (
		<div className='media-md:hidden'>
			{user && <LoggedinBanner user={user} />}

			<div className='container flex items-center justify-between gap-2 py-4'>
				<MobileMenu user={user} />

				<Link
					href='/'
					className='ms-0 w-32 shrink-0'>
					<Image
						className='h-full w-full'
						alt='Biovac pharmacy supplements'
						src={biovacLogo}
						width={200}
					/>
				</Link>

				<CartSidebar />
			</div>
			<Searchbar className='mx-auto mb-2 w-[95%]' />
		</div>
	);

	return (
		<nav className='max-h-fit border-b border-gray-50'>
			{desktop}
			{mobile}
		</nav>
	);
}
