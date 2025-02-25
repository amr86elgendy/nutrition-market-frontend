import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

import CardAuthWrapper from 'components/utils/card-auth-wrapper';
import { SignupForm } from 'app/[locale]/(auth)/signup/signup-form';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'Auth' });

	return {
		title: t('register'),
	};
}

export default function SignupPage() {
	const t = useTranslations('Auth');
	return (
		<CardAuthWrapper
			description={t('registerDescription')}
			title={t('createAccount')}>
			<Suspense fallback='Loading...'>
				<SignupForm />
			</Suspense>
		</CardAuthWrapper>
	);
}
