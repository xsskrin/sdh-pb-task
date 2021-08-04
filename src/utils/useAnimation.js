import { useEffect } from 'react';

const useAnimation = function (animation = {}, config = {}) {
	const { enter, exit } = config;

	useEffect(() => {
		enter && enter();
	}, []);

	useEffect(() => {
		if (animation.exit) {
			animation.confirmExiting();
			exit && exit(animation.onExit);
		}
	}, [animation.exit]);
};

export default useAnimation;
