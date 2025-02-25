import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState<string>('');

	useEffect(() => {
		const id = setTimeout(() => setDebouncedValue(value), delay);

		return () => {
			clearTimeout(id);
		};
	}, [delay, value]);

	return debouncedValue;
};

export default useDebounce;
