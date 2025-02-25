import authAr from './auth/ar';
import cartAr from './cart/ar';
import checkoutAr from './checkout/ar';
import filterAr from './filter/ar';
import footerAr from './footer/ar';
import homeAr from './home/ar';
import orderAr from './order/ar';

const ar = {
	LayoutMetadata: {
		title: {
			template: '%s | ماركت التغذية',
			default: 'ماركت التغذية',
		},
		description: 'المكملات الغذائية | الأختيار الأول لصحتك',
		applicationName: 'ماركت التغذية',
	},
	LocaleSwitcher: {
		label: '{locale, select, ar {عربي} en {English} other {Unknown}}',
	},
	NotFoundPage: {
		title: 'الصفحة غير موجودة',
		description:
			'يبدو أنه لم يتم العثور على أي شيء في هذه الصفحة. ربما يمكنك محاولة البحث عما تبحث عنه؟',
		goHome: 'الرجوع إلي الصفحة الرئيسية',
	},
	...authAr,
	HomePage: homeAr,
	ShopPage: {
		pageMetadata: { title: 'منتجاتنا' },
		pagination: {
			previous: 'السابق',
			next: 'التالي',
		},
	},
	OfferPage: {
		pageMetadata: { title: 'العروض' },
	},
	CartPage: cartAr,
	CheckoutPage: checkoutAr,
	OrderPage: orderAr,

	Filter: filterAr,
	Footer: footerAr,
};
export default ar;
