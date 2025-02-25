import {
	privateRoutesMiddleware,
	refreshToken,
	unAuthenticatedRoutesMiddleware,
} from 'middlewares/auth';
import { chain } from 'middlewares/chain';
import { nextIntlMiddleware } from 'middlewares/i18n';

const middlewares = [
	refreshToken,
	privateRoutesMiddleware,
	unAuthenticatedRoutesMiddleware,
	nextIntlMiddleware,
];

export default chain(middlewares);

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
// export const config = {
// 	// Match only internationalized pathnames
// 	matcher: ['/', '/(en|ar)/:path*'],
// };
