export type TUser = {
	_id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	role: 'admin' | 'user';
	ordersCount: number;
	purchasedProducts: string[];
	blocked: boolean;
	isVerified: boolean;
	createdAt: string;
	updatedAt: string;
};
