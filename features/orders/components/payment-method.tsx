import React, { Dispatch } from 'react';
import { useTranslations } from 'next-intl';

import { Card } from 'components/ui/card';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { PAYMENT_METHODS_MAPPER } from 'constants/index';

export default function PaymentMethod({
	setPaymentMethodId,
}: {
	setPaymentMethodId: Dispatch<React.SetStateAction<string>>;
}) {
	const t = useTranslations('CheckoutPage');

	return (
		<Card>
			<div className='border-gray-40 typography-SB20 border-b p-6'>
				{t('paymentMethod')}
			</div>
			<RadioGroup
				asChild
				onValueChange={pId => setPaymentMethodId(pId)}
				defaultValue={PAYMENT_METHODS_MAPPER[0].id}>
				<ul className='space-y-4 p-6'>
					{PAYMENT_METHODS_MAPPER.map(method => (
						<li
							key={method.id}
							className='flex items-center gap-4 last:pb-0'>
							<RadioGroupItem
								value={method.id}
								id={method.id}
							/>
							<Label
								htmlFor={method.id}
								className='flex items-center gap-2'>
								<method.Icon />
								{t(method.name)}
							</Label>
						</li>
					))}
				</ul>
			</RadioGroup>
		</Card>
	);
}
