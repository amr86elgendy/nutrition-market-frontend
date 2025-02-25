import { useAction } from 'next-safe-action/hooks';
import { PencilIcon, Trash2Icon } from 'lucide-react';

import { Button } from 'components/ui/button';
import { deleteReview } from 'features/reviews/apis/reviews';

export function CommentBtns({
	reviewId,
	openEditingMode,
}: {
	reviewId: string;
	openEditingMode: () => void;
}) {
	const { execute, isPending } = useAction(deleteReview);
	return (
		<div className='flex gap-2'>
			<Button
				data-state={isPending && 'deleting'}
				variant='secondary-white'
				size={'icon'}
				className='hover:bg-red-30 text-red-300'
				onClick={() => {
					execute({ reviewId });
				}}>
				<Trash2Icon size={16} />
			</Button>

			<Button
				onClick={openEditingMode}
				size={'icon'}
				variant='secondary-gray'>
				<PencilIcon size={16} />
			</Button>
		</div>
	);
}
