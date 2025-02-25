import { useLocale } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';

export function Topbar() {
	const locale = useLocale();
	return (
		<nav className='bg-green-500'>
			<div className='relative container flex w-full items-center justify-center'>
				<div className='typography-R14 mx-auto py-2 text-center text-white'>
					Free shipping for any order above 712 EGP
				</div>
				<LocaleSwitcher defaultLocale={locale} />
			</div>
		</nav>
	);
}
