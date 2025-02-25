'use client';

import { DirectionProvider } from '@radix-ui/react-direction';
import { useLocale } from 'next-intl';
import type { ReactNode } from 'react';

export default function RTLdirection({ children }: { children: ReactNode }) {
	const locale = useLocale();
	return (
		<DirectionProvider dir={locale === 'ar' ? 'rtl' : 'ltr'}>
			{children}
		</DirectionProvider>
	);
}
