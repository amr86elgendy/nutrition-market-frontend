import type { Metadata } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import NotFoundIcon from 'assets/icons/not-found';
import { Button } from 'components/ui/button';
import { PUBLIC_ROUTES } from 'constants/routes';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'NotFoundPage' });

	return {
		title: t('title'),
	};
}

export default function NotFound() {
	const t = useTranslations('NotFoundPage');
	return (
		<div className='container flex min-h-[calc(100vh-150px)] flex-col items-center justify-center'>
			<NotFoundIcon />
			<span className='typography-SB24 mt-8 mb-2 text-black'>{t('title')}</span>
			<p className='mb-4 max-w-[40ch] text-center text-gray-200'>
				{t('description')}
			</p>
			<Button asChild>
				<Link href={PUBLIC_ROUTES.home}>{t('goHome')}</Link>
			</Button>
		</div>
	);
}
