import { SVGProps } from 'react';
const PaymentIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={90}
		height={75}
		viewBox='0 0 90 75'
		fill='none'
		{...props}>
		<path
			stroke='#2D6E45'
			d='M10 .5h65a9.5 9.5 0 0 1 9.5 9.5v40a9.5 9.5 0 0 1-9.5 9.5H10A9.5 9.5 0 0 1 .5 50V10A9.5 9.5 0 0 1 10 .5Z'
		/>
		<path
			fill='#1E4C2F'
			d='M85 10H0v10h85V10Z'
		/>
		<path
			fill='#36C196'
			d='M25 40.36H15a5 5 0 0 0 0 10h10a5 5 0 0 0 0-10Z'
		/>
		<path
			fill='#FFBA40'
			d='M75 75c-8.96-2.99-15-11.37-15-20.81v-5.58a5 5 0 0 1 3.42-4.74l10-3.33c1.03-.34 2.14-.34 3.16 0l10 3.33A5 5 0 0 1 90 48.61v5.58c0 9.44-6.04 17.83-15 20.81Z'
		/>
		<path
			stroke='#fff'
			d='m69.7 57.64 3.53 3.53 7.07-7.07'
		/>
	</svg>
);
export { PaymentIcon };
