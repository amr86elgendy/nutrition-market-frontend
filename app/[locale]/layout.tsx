import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { Linksbar } from 'components/layout/linksbar';
import { Toaster } from 'components/ui/toaster';
import { Header } from 'components/layout/header';
import { Topbar } from 'components/layout/topbar';
import { Footer } from 'components/layout/footer';
import RTLdirection from 'components/layout/RTL-direction';

import { routing } from 'i18n/routing';
import type { TLocale } from 'i18n/config';
import { cn } from 'lib/utils';
import { inter, notoKufiArabic } from 'assets/fonts';

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }));
}

type TProps = {
	children: ReactNode;
	params: { locale: string };
};

export default async function LocaleLayout({
	children,
	params: { locale },
}: TProps) {
	const messages = await getMessages();
	if (!routing.locales.includes(locale as TLocale)) {
		notFound();
	}
	setRequestLocale(locale);
	return (
		<html
			lang={locale}
			dir={locale === 'ar' ? 'rtl' : 'ltr'}>
			<body
				className={cn('text-black', {
					[notoKufiArabic.className]: locale === 'ar',
					[inter.className]: locale !== 'ar',
				})}>
				<NextIntlClientProvider messages={messages}>
					<RTLdirection>
						<Topbar />
						<Header />
						<Linksbar />
						<main className='min-h-[calc(100vh-150px)]'>{children}</main>
						<Footer />
						<Toaster />
					</RTLdirection>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
