import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import 'app/globals.css';

type Props = {
	children: ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('LayoutMetadata');

	return {
		title: {
			template: t('title.template'),
			default: t('title.default'),
		},
		description: t('description'),
		applicationName: t('applicationName'),
	};
}

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children }: Props) {
	return children;
}
