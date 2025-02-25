import { useAction } from 'next-safe-action/hooks';
import { removeCouponFromCart } from '../api';
import { cn } from 'lib/utils';
import { LoadingDots } from 'components/utils/loading-dots';
import { XIcon } from 'lucide-react';

export function DeleteCouponButton({
	cartId,
	couponId,
}: {
	cartId: string;
	couponId: string;
}) {
	const { execute, isPending } = useAction(removeCouponFromCart);
	return (
		<button
			onClick={() =>
				execute({
					cartId,
					couponId,
				})
			}
			className={cn(
				'invisible absolute end-0 top-1/2 z-20 flex size-4 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white transition-all group-hover:visible',
				isPending && 'visible'
			)}>
			{isPending ? <LoadingDots color='bg-white' /> : <XIcon size={12} />}
		</button>
	);
}
