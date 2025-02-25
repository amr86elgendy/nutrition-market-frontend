import { LoaderCircleIcon } from 'lucide-react';
import React from 'react';

export default function PageLoading() {
	return (
		<div className='flex h-[calc(100vh-150px)] items-center justify-center'>
			<LoaderCircleIcon
				size={40}
				className='animate-spin text-green-500'
			/>
		</div>
	);
}
