import type { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
	return (
		<section className='media-md:flex media-md:items-center media-md:justify-center container h-full min-h-[70vh] py-12'>
			{children}
		</section>
	);
}
