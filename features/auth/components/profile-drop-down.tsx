import Link from 'next/link';
import { ChevronDown, CircleUserRound, LogOutIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import { LogoutButton } from 'features/auth/components/logout-button';
import type { TUser } from 'features/auth/types/user';
import {
	MessageCircleQuestionIcon,
	SendToBackIcon,
	UserRoundPenIcon,
} from 'lucide-react';

export function ProfileDropdown({ user }: { user: TUser }) {
	const t = useTranslations('Auth');
	const loggedinLinks = [
		{
			label: t('myProfile'),
			to: '/profile',
			Icon: UserRoundPenIcon,
		},
		{
			label: t('myOrders'),
			to: '/orders',
			Icon: SendToBackIcon,
		},
		{
			label: t('needHelp'),
			to: '/orders',
			Icon: MessageCircleQuestionIcon,
		},
	];
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex cursor-pointer items-center gap-2 rounded-md text-sm font-semibold'>
					<CircleUserRound className='text-green-500' />
					<div className='flex max-w-20 flex-col items-start'>
						<span className='typography-R14 text-gray-100'>{t('welcome')}</span>
						<span className='typography-M14 line-clamp-1 flex items-center justify-center gap-1 text-black capitalize'>
							{user.firstName}
							<ChevronDown
								strokeWidth={1.5}
								size={16}
							/>
						</span>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-44'>
				<DropdownMenuGroup>
					{loggedinLinks.map(link => (
						<DropdownMenuItem
							className='gap-x-4'
							key={link.label}>
							<link.Icon
								size={18}
								className='text-gray-400'
							/>
							<Link href={link.to}>{link.label}</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogoutButton className='focus:bg-red-30 gap-x-4 text-red-500 focus:text-red-500'>
						<LogOutIcon size={16} />
						{t('logout')}
					</LogoutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
