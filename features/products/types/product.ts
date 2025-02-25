import type { TCategory } from 'features/products/types/category';
import type { TCompany } from 'features/products/types/company';
import type { TDosageForm } from 'features/products/types/dosage-form';

type PartialOrId<T, K extends keyof T> = Partial<T> | T[K];

type TProduct<VariantType> = {
	_id: string;
	name_en: string;
	name_ar: string;
	slug: string;
	description_en: string;
	description_ar: string;
	directionOfUse: string;
	warnings: string;
	storageConditions: string;
	NFSA_REG_NO: string;
	createdAt: string;
	updatedAt: string;
	numReviews: number;
	averageRating: number;
	freeShipping: boolean;
	featured: boolean;
	nutritionFacts: TNutritionFacts;
	company: TCompany;
	dosageForm: TDosageForm;
	variants: VariantType;
	category: TCategory[];
};
export type TProductWithSingleVariant = TProduct<TVariant>;
export type TProductWithMultipleVariants = TProduct<TVariant[]>;

export type TNutritionFacts = {
	servingSize: string;
	servingPerContainer: string;
	ingredients: {
		_id: string;
		name: string;
		amountPerServing: string;
		dailyValue: string;
	}[];
	otherIngredients: {
		name: string;
	}[];
};

export type TVariant = {
	_id: string;
	name_en: string;
	name_ar: string;
	slug: string;
	unitCount: number;
	quantity: number;
	flavor_en: string;
	flavor_ar: string;
	price: number;
	priceAfterDiscount: number;
	images: { url: string; name: string; size: number; _id: string }[];
	createdAt: string;
	updatedAt: string;
};
