export type TCompany = {
	_id: string;
	name_en: string;
	name_ar: string;
	slug: string;
	description_en: string;
	description_ar: string;
	logo?: {
		name: string;
		size: number;
		url: string;
	};
	cover?: {
		name: string;
		size: number;
		url: string;
	};
	productsCount: number;
	ordersCount: number;
	createdAt: string;
	updatedAt: string;
};

export type TGetCompaniesReturn = {
	companies: TCompany[];
};
