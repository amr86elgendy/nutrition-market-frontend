import { Dispatch } from 'react';
import { Pencil } from 'lucide-react';

import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';

import type { TAddress } from 'features/addresses/types/address';

export function Addresses({
	addresses,
	setAddressId,
	setAddressToEdit,
	openForm,
}: {
	addresses: TAddress[];
	setAddressId: Dispatch<React.SetStateAction<string>>;
	setAddressToEdit: Dispatch<React.SetStateAction<TAddress | undefined>>;
	openForm: () => void;
}) {
	return (
		<RadioGroup
			asChild
			defaultValue={addresses[0]._id}
			onValueChange={addrId => setAddressId(addrId)}
			className='divide-gray-40 gap-0 divide-y px-6'>
			<ul>
				{addresses.map(addr => (
					<li
						key={addr._id}
						className='media-md:flex-row media-md:items-center flex flex-col justify-between gap-4 py-6'>
						<div className='flex items-center gap-4'>
							<RadioGroupItem
								value={addr._id}
								id={addr._id}
							/>
							<Label htmlFor={addr._id}>
								<h4 className='typography-SB16 mb-3'>
									{`${addr.firstName} ${addr.lastName}`}
								</h4>
								<p className='typography-R14 mb-2 leading-6 text-gray-400'>
									{`${addr.street} - ${addr.city} - ${addr.governorate}`}
								</p>
								<p className='typography-R14 text-gray-400'>{addr.phone}</p>
							</Label>
						</div>
						<Button
							variant='outline'
							className='gap-2'
							size='icon'
							onClick={() => {
								openForm();
								setAddressToEdit(addr);
							}}>
							<Pencil size={16} />
						</Button>
					</li>
				))}
			</ul>
		</RadioGroup>
	);
}
