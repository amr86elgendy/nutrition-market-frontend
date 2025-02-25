import { cookies } from 'next/headers';
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

export const getAccessToken = async (cookiesParam?: RequestCookies) => {
	const accessToken = cookiesParam
		? cookiesParam.get(process.env.ACCESS_TOKEN_NAME ?? '')?.value
		: cookies().get(process.env.ACCESS_TOKEN_NAME ?? '')?.value;

	return accessToken;
};
