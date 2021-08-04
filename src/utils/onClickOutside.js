const appElement = document.querySelector('#app');

const isDescendantOf = (element, parent) => {
	while (element) {
		if (element === parent) return true;
		element = element.parentNode;
	}
	return false;
};

const onClickOutside = (element, callback) => {
	const onClick = (event) => {
		if (!isDescendantOf(event.target, element)) {
			callback();
		}
	};

	appElement.addEventListener('click', onClick);

	return () => {
		appElement.removeEventListener('click', onClick);
	};
};

export default onClickOutside;
