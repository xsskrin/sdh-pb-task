const classDescendant = (element, cls) => {
	while (element) {
		if ((element.className || '').split(' ').indexOf(cls) > -1) {
			return element;
		}

		element = element.parentNode;
	}

	return false;
};

export default classDescendant;
