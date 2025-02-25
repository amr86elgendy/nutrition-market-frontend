import React from 'react';
import { BeanOffIcon, DnaOffIcon, WheatOffIcon } from 'lucide-react';

export function Allergen() {
	return (
		<div>
			<p className='typography-B16 mb-4'>Allergen notice</p>
			<div className='media-md:gap-4 flex gap-2 text-green-500'>
				<div className='flex flex-col items-center justify-center'>
					<div className='media-md:p-6 mb-2 rounded-full border border-green-500 p-4'>
						<BeanOffIcon />
					</div>
					<span className='typography-M14 media-md:typography-M16'>
						Soy-free
					</span>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<div className='media-md:p-6 mb-2 rounded-full border border-green-500 p-4'>
						<WheatOffIcon />
					</div>
					<span className='typography-M14 media-md:typography-M16'>
						Gluten-free
					</span>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<div className='media-md:p-6 mb-2 rounded-full border border-green-500 p-4'>
						<DnaOffIcon />
					</div>
					<span className='typography-M14 media-md:typography-M16'>No-gmo</span>
				</div>
			</div>
		</div>
	);
}
