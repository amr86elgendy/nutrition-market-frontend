'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
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
import { register } from 'features/auth/apis/auth';
import { AUTH_ROUTES } from 'constants/routes';

export function SignupForm() {
	const t = useTranslations('Auth');
	const registerSchema = z.object({
		firstName: z.string().min(1, {
			message: `${t('firstName')} ${t('required')}`,
		}),
		lastName: z.string().min(1, {
			message: `${t('lastName')} ${t('required')}`,
		}),
		email: z
			.string()
			.min(1, {
				message: `${t('email')} ${t('required')}`,
			})
			.email(t('invalidEmailError')),
		password: z
			.string()
			.min(1, `${t('password')} ${t('required')}`)
			.min(6, t('passwordMaxLengthError')),
		rememberMe: z.boolean(),
	});
	const form = useForm<z.infer<typeof registerSchema>>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			rememberMe: false,
		},
		resolver: zodResolver(registerSchema),
	});

	const { execute, isPending } = useAction(register, {
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});

	function onSubmit(values: z.infer<typeof registerSchema>) {
		execute(values);
	}
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='space-y-8'>
			<Form {...form}>
				<div className='grid grid-cols-2 gap-x-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('firstName')}</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='John'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('lastName')}</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Doe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>{t('email')}</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='m@example.com'
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
							<FormLabel>{t('password')}</FormLabel>
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
			<p className='text-gray-6 typography-R14'>
				{t('haveAccount')}{' '}
				<Link
					href={AUTH_ROUTES.login}
					className='text-black-3 typography-M14 underline'>
					{t('login')}
				</Link>
			</p>
		</form>
	);
}
