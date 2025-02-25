import React from 'react';
import { LoaderCircleIcon } from 'lucide-react';

export default function Loading() {
	return (
		<div className='flex h-screen flex-col items-center justify-center'>
			<LoaderCircleIcon
				size={40}
				className='animate-spin text-green-500'
			/>
		</div>
	);
}
