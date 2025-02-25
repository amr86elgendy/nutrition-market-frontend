import { Dispatch, useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Addresses } from './addresses';
import { AddressForm } from './form';

import type { TAddress } from '../types/address';
import type { TGovernorate } from '../types/egypt';

export default function ShippingAddress({
	setAddressId,
	userFirstName,
	userLastName,
	userEmail,
	userPhoneNumber,
	governorates,
	addresses,
}: {
	setAddressId: Dispatch<React.SetStateAction<string>>;
	userFirstName?: string;
	userLastName?: string;
	userEmail?: string;
	userPhoneNumber?: string;
	governorates: TGovernorate[];
	addresses: TAddress[];
}) {
	const t = useTranslations('CheckoutPage');
	const isUserHasAddress = addresses.length !== 0;
	const [isInFormMode, setIsInFormMode] = useState(!isUserHasAddress);
	const [addressToEdit, setAddressToEdit] = useState<TAddress | undefined>(
		undefined
	);

	const openForm = () => setIsInFormMode(true);
	const closeForm = () => setIsInFormMode(false);

	return (
		<Card>
			<div className='border-gray-40 typography-SB20 flex justify-between border-b p-6'>
				{t('shippingAddress')}
				{!isInFormMode && (
					<Button
						onClick={openForm}
						aria-label='Add new address'
						variant='secondary-gray'
						className='size-8'
						size='icon'>
						<Plus size={16} />
					</Button>
				)}
			</div>

			{isInFormMode && (
				<AddressForm
					setAddressId={setAddressId}
					userFirstName={userFirstName}
					userLastName={userLastName}
					userEmail={userEmail}
					userPhoneNumber={userPhoneNumber}
					governorates={governorates}
					isUserHasAddress={isUserHasAddress}
					addressToEdit={addressToEdit}
					setAddressToEdit={setAddressToEdit}
					closeForm={closeForm}
				/>
			)}
			{!isInFormMode && isUserHasAddress && (
				<Addresses
					setAddressId={setAddressId}
					addresses={addresses}
					setAddressToEdit={setAddressToEdit}
					openForm={openForm}
				/>
			)}
		</Card>
	);
}
