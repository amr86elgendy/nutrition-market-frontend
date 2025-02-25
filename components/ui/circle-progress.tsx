import React from 'react';

export function CircleProgress({
	precentage,
	circleSize = 64,
	strokeWidth = 6,
	children,
}: {
	circleSize?: number;
	precentage: number;
	strokeWidth?: number;
	children: React.ReactNode;
}) {
	const radius = circleSize / 2 - strokeWidth;
	const dashArray = radius * Math.PI * 2;
	const dashOffset = dashArray - (dashArray * precentage) / 100;
	return (
		<div className='relative'>
			<svg
				style={{ height: circleSize, width: circleSize }}
				viewBox={`0 0 ${circleSize} ${circleSize}`}>
				<circle
					className='text-gray-50'
					strokeWidth={strokeWidth}
					stroke='currentColor'
					fill='transparent'
					r={radius}
					cx={circleSize / 2}
					cy={circleSize / 2}
				/>
				<circle
					transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
					className='text-green-500'
					strokeWidth={strokeWidth}
					strokeDasharray={dashArray}
					strokeDashoffset={dashOffset}
					strokeLinecap='round'
					stroke='currentColor'
					fill='transparent'
					r={radius}
					cx={circleSize / 2}
					cy={circleSize / 2}
				/>
			</svg>
			<div className='absolute end-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2'>
				{children}
			</div>
		</div>
	);
}
