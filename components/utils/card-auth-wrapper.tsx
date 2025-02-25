import { Card, CardDescription, CardTitle } from 'components/ui/card';
import type { ReactNode } from 'react';

type TCardAuthWrapper = {
	title: string;
	description: string;
	children: ReactNode;
};

export default function CardAuthWrapper({
	title,
	description,
	children,
}: TCardAuthWrapper) {
	return (
		<Card className='media-md:max-w-[500px] media-md:border media-md:p-8 w-full border-0 p-0'>
			<CardTitle className='typography-B24 mb-[12px]'>{title}</CardTitle>
			<CardDescription className='mb-[32px]'>{description}</CardDescription>
			{children}
		</Card>
	);
}
