'use client';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';
import { useTranslations } from 'next-intl';

import CheckEmail from './CheckEmail';
import { useToast } from 'components/ui/use-toast';
import { Button } from 'components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';

import { forgotPasswordSchema } from 'features/auth/apis/schema';
import { forgotPassword } from 'features/auth/apis/auth';

export default function ForgotPasswordForm() {
	const { toast } = useToast();
	const t = useTranslations('Auth');
	const form = useForm<z.infer<typeof forgotPasswordSchema>>({
		defaultValues: {
			email: '',
		},
		resolver: zodResolver(forgotPasswordSchema),
	});

	const { execute, isPending, hasSucceeded } = useAction(forgotPassword, {
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});

	function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
		execute(values);
	}

	if (hasSucceeded) {
		return <CheckEmail email={form.watch('email')} />;
	}
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='space-y-8'>
			<Form {...form}>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('email')}</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
			<Button
				type='submit'
				disabled={isPending}
				className='w-full capitalize'>
				{isPending ? (
					<>
						<Loader2 className='me-2 h-4 w-4 animate-spin' />
						{t('pleaseWait')}
					</>
				) : (
					t('requestPasswordReset')
				)}
			</Button>
		</form>
	);
}
