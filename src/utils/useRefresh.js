import { useState } from 'react';

const useRefresh = () => {
	const [, refresh] = useState({});

	return () => {
		refresh({});
	};
};

export default useRefresh;
