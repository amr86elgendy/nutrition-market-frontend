import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function convertToReadableNumber(num: number) {
	if (num && !isNaN(num)) {
		return parseInt(String(num), 10)?.toLocaleString();
	}
	return num;
}
