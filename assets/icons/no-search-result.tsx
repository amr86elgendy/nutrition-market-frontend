import { SVGProps } from 'react';

export default function NoSearchResult(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width='167'
			height='77'
			viewBox='0 0 167 77'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M160 0C163.866 0 167 3.13401 167 7C167 10.866 163.866 14 160 14H120C123.866 14 127 17.134 127 21C127 24.866 123.866 28 120 28H142C145.866 28 149 31.134 149 35C149 38.866 145.866 42 142 42H131.826C126.952 42 123 45.134 123 49C123 51.5773 125 53.9107 129 56C132.866 56 136 59.134 136 63C136 66.866 132.866 70 129 70H46C42.134 70 39 66.866 39 63C39 59.134 42.134 56 46 56H7C3.13401 56 0 52.866 0 49C0 45.134 3.13401 42 7 42H47C50.866 42 54 38.866 54 35C54 31.134 50.866 28 47 28H22C18.134 28 15 24.866 15 21C15 17.134 18.134 14 22 14H62C58.134 14 55 10.866 55 7C55 3.13401 58.134 0 62 0H160ZM160 28C163.866 28 167 31.134 167 35C167 38.866 163.866 42 160 42C156.134 42 153 38.866 153 35C153 31.134 156.134 28 160 28Z'
				fill='#F3F7FF'
			/>
			<circle
				cx='86.5'
				cy='35.5'
				r='29.5'
				stroke='#1E4C2F'
				strokeWidth='4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<line
				x1='109.593'
				y1='57.7646'
				x2='125.765'
				y2='73.9362'
				stroke='#1E4C2F'
				strokeWidth='4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M96 26L76 45M96 26L76 45'
				stroke='#36C196'
				strokeWidth='4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M76 26L96 45M76 26L96 45'
				stroke='#36C196'
				strokeWidth='4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
