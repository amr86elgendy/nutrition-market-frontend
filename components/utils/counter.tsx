export function Counter({
	count = 1,
	increaseByOne,
	decreaseByOne,
}: {
	count?: number;
	increaseByOne: () => void;
	decreaseByOne: () => void;
}) {
	return (
		<div className='border-gray-40 flex max-w-[107px] grow items-center justify-center gap-6 rounded-md border px-4'>
			<span
				className='cursor-pointer'
				onClick={decreaseByOne}>
				-
			</span>
			<h3>{count}</h3>
			<span
				onClick={increaseByOne}
				className='text-green-light-700 cursor-pointer'>
				+
			</span>
		</div>
	);
}
