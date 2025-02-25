'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';

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
import { toast } from 'components/ui/use-toast';

import { login, loginWithGoogle } from 'features/auth/apis/auth';
import { Separator } from 'components/ui/separator';
import { GooogleIcon } from 'assets/icons/google-icon';

export function LoginForm() {
	const searchParams = useSearchParams();
	const from = searchParams.get('from');

	const t = useTranslations('Auth');

	const loginSchema = z.object({
		email: z
			.string()
			.min(1, {
				message: 'Email is required',
			})
			.email('Please enter a valid email address'),
		password: z.string().min(1, {
			message: 'Password is required',
		}),
		rememberMe: z.boolean(),
	});

	const form = useForm<z.infer<typeof loginSchema>>({
		defaultValues: {
			email: 'mazen@amr.com',
			password: '123456',
			rememberMe: false,
		},
		resolver: zodResolver(loginSchema),
	});

	const { execute, isPending } = useAction(login, {
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});

	const { execute: executeLoginWithGoogle, isPending: isLoggingWithProvider } =
		useAction(loginWithGoogle, {
			onError: ({ error }) => {
				toast({
					variant: 'destructive',
					title: 'Server Error',
					description: error.serverError,
				});
			},
		});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		execute({ ...values, from });
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
								<Input
									required
									placeholder='Enter your email address'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<div className='flex items-center'>
								<FormLabel>{t('password')}</FormLabel>
								<Link
									href='/forgot-password'
									className='ms-auto inline-block text-sm underline'>
									{t('forgotPassword')}
								</Link>
							</div>
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
						<Loader2 className='me-2 h-4 w-4 animate-spin' />
						{t('pleaseWait')}
					</>
				) : (
					t('continue')
				)}
			</Button>
			<div className='relative'>
				<Separator />
				<span className='typography-M13 absolute start-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white px-3 text-gray-200'>
					{t('or')}
				</span>
			</div>

			<Button
				type='button'
				onClick={() => executeLoginWithGoogle()}
				variant='outline'
				className='w-full gap-2 shadow-none'>
				{isLoggingWithProvider ? (
					<Loader2 className='me-2 h-4 w-4 animate-spin' />
				) : (
					<>
						<GooogleIcon />
						{t('continueWithGoogle')}
					</>
				)}
			</Button>

			<p className='text-gray-6 typography-R14'>
				{t("don'tHaveAccount")}{' '}
				<Link
					className='text-black-3 typography-M14 underline'
					href='/signup'>
					{t('register')}
				</Link>
			</p>
		</form>
	);
}
