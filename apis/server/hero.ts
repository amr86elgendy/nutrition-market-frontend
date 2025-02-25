import { request } from 'apis/request';
import type { TImage, TPath } from 'features/products/types/image';

type TGetImagesReturn = {
	images: TImage[];
};

export const getHeroImages = async ({
	path,
}: {
	path: TPath;
}): Promise<TGetImagesReturn> => {
	const data = await request({
		url: `/images`,
		query: { path },
		cache: 'force-cache',
	});

	return data;
};
