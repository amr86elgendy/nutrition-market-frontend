import { Suspense } from 'react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import CardAuthWrapper from 'components/utils/card-auth-wrapper';
import ForgotPasswordForm from './forgot-password-form';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'Auth' });

	return {
		title: t('recoverPassord'),
	};
}

export default function ForgotPasswordPage() {
	const t = useTranslations('Auth');
	return (
		<CardAuthWrapper
			description={t('forgotPasswordDescription')}
			title={t('recoverPassord')}>
			<Suspense fallback='forgot password Loading...'>
				<ForgotPasswordForm />
			</Suspense>
		</CardAuthWrapper>
	);
}
