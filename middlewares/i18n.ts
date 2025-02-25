import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import type { CustomMiddleware } from './chain';
import { routing } from 'i18n/routing';

const intlMiddleware = createMiddleware(routing);

export const nextIntlMiddleware = (middleware: CustomMiddleware) => {
	return async (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse
	) => {
		// Use the next-intl middleware
		const intlResult = intlMiddleware(request);

		if (intlResult) {
			// If next-intl middleware returns a response, end the chain
			return intlResult;
		}

		// Otherwise, proceed to the next middleware in the chain
		return middleware(request, event, response);
	};
};
