import { cn } from 'lib/utils';
import React from 'react';

export function Overlay({ isSearchListOpen }: { isSearchListOpen: boolean }) {
	return (
		<div
			className={cn(
				'behavior-discrete fixed inset-0 z-30 hidden h-full w-full overflow-hidden bg-[rgba(0,0,0,0.7)] opacity-0 transition-all',
				isSearchListOpen && 'block opacity-100 starting:opacity-0'
			)}
		/>
	);
}
