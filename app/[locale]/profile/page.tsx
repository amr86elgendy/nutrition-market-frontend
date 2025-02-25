import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const t = await getTranslations({
		locale,
		namespace: 'OrderPage.pageMetadata',
	});

	return {
		title: t('title'),
	};
}

export default function Profile() {
	return <div>Profile</div>;
}
