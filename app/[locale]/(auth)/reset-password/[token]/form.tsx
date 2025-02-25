'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hooks';
import { Loader2Icon } from 'lucide-react';

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
import { resetPasswordSchema } from 'features/auth/apis/schema';
import { useToast } from 'components/ui/use-toast';
import { resetPassword } from 'features/auth/apis/auth';
import { AUTH_ROUTES } from 'constants/routes';

const resetPasswordFormSchema = resetPasswordSchema
	.omit({ token: true })
	.refine(
		values => {
			return values.password === values.confirmPassword;
		},
		{
			message: 'Passwords must match!',
			path: ['confirmPassword'],
		}
	);
export default function ResetPasswordForm() {
	const t = useTranslations('Auth');
	const { token } = useParams<{ token: string }>();
	const router = useRouter();

	const { toast } = useToast();

	const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(resetPasswordFormSchema),
	});

	const { execute, isPending } = useAction(resetPassword, {
		onSuccess: ({ data }) => {
			toast({
				title: data?.msg,
			});
			router.push(AUTH_ROUTES.login);
		},
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});

	function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
		execute({ ...values, token });
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='space-y-8'>
			<Form {...form}>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('newPassword')}</FormLabel>
							<FormControl>
								<Input
									type='password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('confirmPassword')}</FormLabel>

							<FormControl>
								<Input
									type='password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
			<Button
				type='submit'
				disabled={isPending}
				className='w-full'>
				{isPending ? (
					<>
						<Loader2Icon className='me-2 h-4 w-4 animate-spin' />
						{t('pleaseWait')}
					</>
				) : (
					t('continue')
				)}
			</Button>
		</form>
	);
}
