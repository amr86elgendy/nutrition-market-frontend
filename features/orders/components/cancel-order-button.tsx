'use client';

import { useState } from 'react';
import { FrownIcon, Loader2Icon, XIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useTranslations } from 'next-intl';

import { cancelOrder } from 'features/orders/apis/orders';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { toast } from 'components/ui/use-toast';

export function CancelOrderButton({ orderId }: { orderId: string }) {
	const t = useTranslations('OrderPage');
	const [isOpen, setIsOpen] = useState(false);
	const [cancelReason, setCancelReason] = useState('');
	const [error, setError] = useState('');

	const { execute, isPending } = useAction(cancelOrder, {
		onSuccess: async () => {
			setIsOpen(false);
		},
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className='bg-orange-40 mt-auto flex w-full items-center gap-1 border border-orange-300 text-orange-600 hover:bg-orange-300 hover:text-white'>
					<XIcon size={20} />
					{t('cancelOrder')}
				</Button>
			</DialogTrigger>
			<DialogContent className='media-sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='flex items-center gap-2'>
						<FrownIcon />
						We're Sorry to See You Go!
					</DialogTitle>
					<DialogDescription className='flex flex-col'>
						<span className='typography-M16 mt-4 inline-block'>
							Before you proceed, we’d love to understand your reasons?
						</span>
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col gap-2'>
					{[
						{ reason: 'I found a better price elsewhere' },
						{ reason: 'The item is no longer needed' },
						{ reason: 'I experienced issues during checkout.' },
						{ reason: 'I changed my mind about the purchase' },
						{ reason: 'Other reason' },
					].map(el => (
						<Button
							type='button'
							onClick={() => {
								setError('');
								setCancelReason(el.reason);
							}}
							key={el.reason}
							variant={cancelReason === el.reason ? 'ghost-green' : 'outline'}
							className='shadow-none'>
							{el.reason}
						</Button>
					))}
					{error && (
						<span className='typography-R14 text-red-500'>{error}</span>
					)}
				</div>

				<DialogFooter>
					<Button
						onClick={() => {
							if (!cancelReason) {
								setError('Please provide reason');
								return;
							}
							execute({ cancelReason, orderId });
						}}
						type='submit'
						disabled={isPending}>
						{isPending ? (
							<>
								<Loader2Icon className='me-2 h-4 w-4 animate-spin' />
								Please wait
							</>
						) : (
							'Cancel order'
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
