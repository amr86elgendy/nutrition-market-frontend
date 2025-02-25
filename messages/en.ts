import authEn from './auth/en';
import cartEn from './cart/en';
import checkoutEn from './checkout/en';
import filterEn from './filter/en';
import footerEn from './footer/en';
import homeEn from './home/en';
import orderEn from './order/en';

const en = {
	LayoutMetadata: {
		title: {
			template: '%s | The Nutrition Market',
			default: 'The Nutrition Market default',
		},
		description: 'Supplement | Your healthy choice',
		applicationName: 'The Nutrition Market',
	},
	LocaleSwitcher: {
		label: '{locale, select, ar {عربي} en {English} other {Unknown}}',
	},
	NotFoundPage: {
		title: 'Page Not Found',
		description:
			'It looks like nothing was found at this location. Maybe try to search for what you are looking for ?',
		goHome: 'Go to home',
	},
	...authEn,
	HomePage: homeEn,
	ShopPage: {
		pageMetadata: { title: 'Shop' },
		pagination: {
			previous: 'Previous',
			next: 'Next',
		},
	},
	OfferPage: {
		pageMetadata: { title: 'Offer' },
	},
	CartPage: cartEn,
	CheckoutPage: checkoutEn,
	OrderPage: orderEn,

	Filter: filterEn,
	Footer: footerEn,
};

export default en;
