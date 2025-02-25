import { Suspense } from 'react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import CardAuthWrapper from 'components/utils/card-auth-wrapper';
import ResetPasswordForm from './form';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({ locale, namespace: 'Auth' });

	return {
		title: t('resetPassword'),
	};
}

export default function ResetPasswordPage() {
	const t = useTranslations('Auth');
	return (
		<CardAuthWrapper
			title={t('resetPassword')}
			description={t('resetPasswordDescription')}>
			<Suspense fallback='reset password loading...'>
				<ResetPasswordForm />
			</Suspense>
		</CardAuthWrapper>
	);
}
