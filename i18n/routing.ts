import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales } from './config';

export const routing = defineRouting({
	locales,
	defaultLocale: 'ar',
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
	createNavigation(routing);
