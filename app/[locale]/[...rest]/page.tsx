import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

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
export default function CatchAllWrongRoutes() {
	notFound();
}
