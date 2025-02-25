import { Suspense } from 'react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import CardAuthWrapper from 'components/utils/card-auth-wrapper';
import { LoginForm } from 'app/[locale]/(auth)/login/login-form';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'Auth' });

	return {
		title: t('login'),
	};
}

export default function LoginPage() {
	const t = useTranslations('Auth');
	return (
		<CardAuthWrapper
			description={t('loginDescription')}
			title={t('login')}>
			<Suspense fallback='Loading...'>
				<LoginForm />
			</Suspense>
		</CardAuthWrapper>
	);
}
