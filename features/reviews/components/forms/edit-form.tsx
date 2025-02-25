'use client';

import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from 'components/ui/textarea';
import { RatingField } from 'components/ui/rating-field';

import { cn } from 'lib/utils';

import type { TReview } from 'features/reviews/types/review';
import { updateReview } from 'features/reviews/apis/reviews';

const reviewSchema = z
	.object({
		rating: z.number({ required_error: 'Review rating is required' }),
		title: z.string().min(1, 'Review title is required'),
		comment: z.string().min(1, 'Review comment is required'),
	})
	.required({ title: true });

export const EditableForm = ({
	closeEditableMode,
	...review
}: {
	closeEditableMode: () => void;
} & Pick<TReview, '_id' | 'rating' | 'title' | 'comment'>) => {
	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			rating: review?.rating,
			title: review?.title,
			comment: review?.comment,
		},
	});

	const {
		execute,
		isPending,
		result: resultUpdateReview,
		hasErrored,
	} = useAction(updateReview, {
		onSuccess() {
			closeEditableMode();
		},
	});

	const onSubmit = (values: z.infer<typeof reviewSchema>) => {
		execute({ reviewId: review._id, ...values });
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className={cn('space-y-6 rounded-md border border-gray-50 p-4', {
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
					disabled={isPending}
					variant={'primary'}
					className='me-2'>
					{isPending ? (
						<>
							<LoaderCircle className='me-2 h-4 w-4 animate-spin' />
							Please wait
						</>
					) : (
						'Update review'
					)}
				</Button>

				<Button
					onClick={closeEditableMode}
					variant={'outline'}
					type='submit'>
					Cancel
				</Button>
			</Form>
		</form>
	);
};
