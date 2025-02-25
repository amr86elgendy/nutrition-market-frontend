import { useEffect, useState } from 'react';

export const useGetBodyHeight = ({ enabled }: { enabled?: boolean }) => {
	const [bodyHeight, setBodyHeight] = useState(0);
	useEffect(() => {
		if (!enabled) return;
		setBodyHeight(document.body.clientHeight);
	}, [enabled]);

	return bodyHeight;
};
