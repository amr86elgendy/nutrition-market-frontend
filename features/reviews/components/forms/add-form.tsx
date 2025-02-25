'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Textarea } from 'components/ui/textarea';
import { Separator } from 'components/ui/separator';
import { RatingField } from 'components/ui/rating-field';

import { cn } from 'lib/utils';
import type { TUser } from 'features/auth/types/user';
import { addReview } from 'features/reviews/apis/reviews';

const reviewSchema = z
	.object({
		rating: z.number({ required_error: 'Review rating is required' }),
		title: z.string().min(1, 'Review title is required'),
		comment: z.string().min(1, 'Review comment is required'),
	})
	.required({ title: true });

export const AddForm = ({
	user,
	hasUserReview,
	productId,
	productSlug,
}: {
	hasUserReview: boolean;
	user?: TUser;
	productId: string;
	productSlug: string;
}) => {
	const {
		execute,
		reset: resetAction,
		isPending,
		hasErrored,
		hasSucceeded,
		result,
	} = useAction(addReview);

	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			title: '',
			comment: '',
		},
	});

	useEffect(() => {
		if (hasSucceeded) {
			setTimeout(() => resetAction(), 8000);
		}
	}, [hasSucceeded]);

	const onSubmit = (values: z.infer<typeof reviewSchema>) => {
		execute({ productId, ...values });
		form.reset();
	};

	if (hasUserReview) {
		return hasSucceeded ? (
			<div>
				<Separator className='mt-8 mb-4' />
				<span className='text-green-light-700 typography-M16 flex gap-2'>
					<CheckCircle2 />
					Your review added successfully
				</span>
			</div>
		) : null;
	}

	if (!user) {
		return (
			<div className='space-y-8'>
				<Separator />

				<p className='typography-SB18'>
					Review this product <br />
					<span className='typography-R14 text-gray-200'>
						Share your thoughts with other customers
					</span>
				</p>

				<Button
					asChild
					className='w-full capitalize'>
					<Link href={`/login?from=shop/${productSlug}`}>Write a review</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			<Separator />

			<p className='typography-SB18 mb-8'>
				Review this product <br />
				<span className='typography-R14 text-gray-200'>
					Share your thoughts with other customers
				</span>
			</p>

			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn('space-y-6', {
					'pointer-events-none opacity-50': hasErrored,
				})}>
				<Form {...form}>
					<FormField
						control={form.control}
						name='rating'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rating</FormLabel>
								<FormControl>
									<RatingField {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Review Title</FormLabel>
								<FormControl>
									<Input
										placeholder='e.g. Easy To Use'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='comment'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Review</FormLabel>
								<FormControl>
									<Textarea
										placeholder='e.g. Easy To Use'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='w-full'
						disabled={isPending}>
						{isPending ? (
							<>
								<LoaderCircle className='me-2 h-4 w-4 animate-spin' />
								Please wait
							</>
						) : (
							'Submit'
						)}
					</Button>
				</Form>
			</form>
			{hasErrored && (
				<h1 className='border-gray-40 -mt-2 mb-4 border-t pt-2 text-red-500'>
					{result.serverError}
				</h1>
			)}
		</div>
	);
};
