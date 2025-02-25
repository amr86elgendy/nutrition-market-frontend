import { useAction } from 'next-safe-action/hooks';

import EmailSentSuccessfully from 'assets/icons/email-sent-successfully';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { toast } from 'components/ui/use-toast';
import { forgotPassword } from 'features/auth/apis/auth';
import { useTranslations } from 'next-intl';

export default function CheckEmail({ email }: { email: string }) {
	const t = useTranslations('Auth');
	const { execute } = useAction(forgotPassword, {
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});
	const onResend = async () => {
		execute({ email });
	};
	return (
		<section className='flex flex-col items-center gap-y-4'>
			<EmailSentSuccessfully />
			<div className='mt-6 flex flex-col items-center'>
				<h1 className='typography-B20 capitalize'>{t('checkYourEmail')}</h1>
				<p className='text-gray-90 typography-L14'>{t('weSendTo')}</p>
				<p className='text-gray-90 typography-R14'>{email}</p>
			</div>
			<p className='bg-gray-20 typography-R14 p-2 text-red-500'>
				{t('linkExpires')}
			</p>
			<div>
				<Separator />
				<p className='typography-R14'>
					{t('didnotRecieveEmail')}{' '}
					<Button
						className='px-0 text-green-500 underline underline-offset-1'
						variant='link'
						onClick={onResend}>
						{t('resend')}
					</Button>
				</p>
			</div>
		</section>
	);
}
