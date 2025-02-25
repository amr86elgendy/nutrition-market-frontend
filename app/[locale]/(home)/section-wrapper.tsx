import type { ReactNode } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { MoveRightIcon, MoveLeftIcon } from 'lucide-react';

import { Button } from 'components/ui/button';

export default function SectionWrapper({
	title,
	description,
	href,
	children,
}: {
	title: string;
	description: string;
	href: string;
	children: ReactNode;
}) {
	const locale = useLocale();
	const t = useTranslations('HomePage');
	return (
		<section className='container space-y-4 py-10'>
			<div className='flex items-end justify-between'>
				<h3 className='typography-B18 media-sm:gap-4 media-md:flex-row flex flex-col items-center text-center text-green-800'>
					{title}
					<span className='typography-R14 text-gray-100'>{description}</span>
				</h3>
				<Button
					className='media-md:flex h-auto shrink-0 gap-2 px-0'
					variant='link'
					asChild>
					<Link href={href}>
						{t('viewAll')}{' '}
						{locale === 'ar' ? (
							<MoveLeftIcon size={16} />
						) : (
							<MoveRightIcon size={16} />
						)}
					</Link>
				</Button>
			</div>
			{children}
		</section>
	);
}
