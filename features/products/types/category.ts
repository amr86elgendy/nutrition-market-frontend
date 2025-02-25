export type TCategory = {
	_id: string;
	name_en: string;
	name_ar: string;
	slug: string;
	description_en: string;
	description_ar: string;
	cover: { name: string; size: number; url: string };
	productsCount: number;
	createdAt: string;
	updatedAt: string;
};

export type TGetCategoriesReturn = {
	categories: TCategory[];
};

export type TGetTopSellingCategoriesReturn = {
	categories: {
		_id: string;
		totalSold: number;
		category: TCategory;
	}[];
};
