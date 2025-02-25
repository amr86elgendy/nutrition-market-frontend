import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { Loader2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { payCash, payOnline } from 'apis/server/payment';
import { Button } from 'components/ui/button';
import { useToast } from 'components/ui/use-toast';
import { PAYMENT_METHODS_IDS } from 'constants/index';

export function PlaceOrderBtn({
	paymentMethodId,
	addressId,
	cartId,
}: {
	paymentMethodId: string;
	addressId: string;
	cartId: string;
}) {
	const t = useTranslations('CheckoutPage');
	const router = useRouter();
	const { toast } = useToast();
	const { execute: payOnlineOrder, isPending: onlinePending } = useAction(
		payOnline,
		{
			onError: ({ error }) => {
				toast({
					variant: 'destructive',
					title: 'Server Error',
					description: error.serverError,
				});
			},
			onSuccess: ({ data }) => {
				if (data?.clientSecret) {
					window.location.assign(
						`https://accept.paymob.com/unifiedcheckout/?publicKey=${process.env.NEXT_PUBLIC_PAYMOB_PK}&clientSecret=${data?.clientSecret}`
					);
				}
			},
		}
	);
	const { execute: payCashOrder, isPending: cashPending } = useAction(payCash, {
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
		onSuccess: ({ data }) => {
			router.push(`/orders/status?orderId=${data?.order?._id}`);
		},
	});

	return (
		<Button
			disabled={onlinePending || cashPending}
			onClick={() => {
				if (paymentMethodId === PAYMENT_METHODS_IDS.cashOnDelivery) {
					payCashOrder({ addressId, cartId });
				} else {
					payOnlineOrder({ addressId, cartId, paymentMethodId });
				}
			}}
			className='rounded-md py-3 text-center'>
			{onlinePending || cashPending ? (
				<>
					<Loader2Icon className='me-2 h-4 w-4 animate-spin' />
					{t('pleaseWait')}
				</>
			) : (
				t('placeOrder')
			)}
		</Button>
	);
}
