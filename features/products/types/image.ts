import { IMAGES_PATHS } from 'constants/index';

export type TPath = (typeof IMAGES_PATHS)[keyof typeof IMAGES_PATHS];

export type TImage = {
	_id: string;
	image: {
		_id: string;
		name: string;
		size: number;
		url: string;
	};
	title: string;
	description: string;
	path: TPath;
	relatedProduct?: {
		_id: string;
		name: string;
		description: string;
	};
};
