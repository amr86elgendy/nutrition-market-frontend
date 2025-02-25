'use client';

import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'components/ui/select';

import { routing, usePathname, useRouter } from 'i18n/routing';
import type { TLocale } from 'i18n/config';
import EgyptFlag from 'assets/icons/egypt-flag';
import UsaFlag from 'assets/icons/usa-flag';
import { cn } from 'lib/utils';
import { inter, notoKufiArabic } from 'assets/fonts';

type TProps = {
	defaultLocale: string;
	// label: string;
};

export function LocaleSwitcher({ defaultLocale }: TProps) {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const t = useTranslations('LocaleSwitcher');
	const [isPending, startTransition] = useTransition();
	function onSelectChange(value: string) {
		const nextLocale = value as TLocale;
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: nextLocale }
			);
		});
	}
	return (
		<Select
			defaultValue={defaultLocale}
			disabled={isPending}
			onValueChange={onSelectChange}>
			<SelectTrigger className='absolute end-0 top-1/2 z-20 w-32 -translate-y-1/2 border-none bg-green-500 text-white disabled:bg-green-500'>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{routing.locales.map(locale => (
						<SelectItem
							key={locale}
							value={locale}>
							<div className='flex gap-x-2'>
								<span>
									{locale === 'ar' ? (
										<EgyptFlag width={20} />
									) : (
										<UsaFlag width={20} />
									)}
								</span>
								<span
									className={cn({
										[notoKufiArabic.className]: locale === 'ar',
										[inter.className]: locale !== 'ar',
									})}>
									{t('label', { locale })}
								</span>
							</div>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
