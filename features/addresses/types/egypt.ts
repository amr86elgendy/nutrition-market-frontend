export type TGovernorate = {
	id: string;
	governorate_name_ar: string;
	governorate_name_en: string;
};

export type TCity = {
	id: string;
	governorate_id: string;
	city_name_ar: string;
	city_name_en: string;
};
