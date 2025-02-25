'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationLink,
	PaginationNext,
} from 'components/ui/pagination';

const PAGINATION_DISPLAYED_LIMIT = 4;
const MIDDLE_INDEX = Math.floor(PAGINATION_DISPLAYED_LIMIT / 2);

export function PaginationContainer({
	lastPage,
	currentPage,
}: {
	currentPage: number;
	lastPage: number;
}) {
	const sp = useSearchParams();
	const pageParam = sp?.get('page') ?? '';

	const offset = +pageParam >= MIDDLE_INDEX ? +pageParam - MIDDLE_INDEX : 0;

	const manipulatedSp = new URLSearchParams(sp);

	const setPage = (value: string | number) => {
		if (value === 1) {
			manipulatedSp.delete('page');
		} else {
			manipulatedSp.set('page', String(value));
		}
		return `?${manipulatedSp.toString()}`;
	};

	return (
		<Pagination className='py-8'>
			<PaginationContent>
				{currentPage !== 1 && (
					<PaginationItem>
						<PaginationPrevious href={setPage(currentPage - 1)} />
					</PaginationItem>
				)}
				{Array.from({
					length: Math.min(lastPage, PAGINATION_DISPLAYED_LIMIT + offset),
				})
					.map((_, i) => {
						const pageNumber = i + 1;
						return (
							<PaginationItem key={pageNumber}>
								<PaginationLink
									isActive={currentPage === pageNumber}
									href={setPage(pageNumber)}>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						);
					})
					.slice(0 + offset, PAGINATION_DISPLAYED_LIMIT + offset)}

				{currentPage !== lastPage && (
					<PaginationItem>
						<PaginationNext href={setPage(currentPage + 1)} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
}
