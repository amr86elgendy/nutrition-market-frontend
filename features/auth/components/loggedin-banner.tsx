import { useTranslations } from 'next-intl';
import { CircleUserRoundIcon } from 'lucide-react';

import { LogoutButton } from '../../../features/auth/components/logout-button';
import { LoadingDots } from 'components/utils/loading-dots';
import type { TUser } from 'features/auth/types/user';

export function LoggedinBanner({ user }: { user: TUser }) {
	const t = useTranslations('Auth');
	return (
		<div className='container flex justify-between bg-[#dda15e] py-2 text-white'>
			<div className='flex items-center gap-2'>
				<CircleUserRoundIcon />
				<span>
					{t('welcome')},{' '}
					<strong className='capitalize'>{user.firstName}</strong>
				</span>
			</div>
			<LogoutButton
				className='w-auto hover:underline'
				pending={<LoadingDots color='bg-white' />}>
				{t('logout')}
			</LogoutButton>
		</div>
	);
}
