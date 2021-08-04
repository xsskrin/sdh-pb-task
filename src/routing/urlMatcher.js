const check = (path, location, config) => {
	if (config.exact) {
		return path === location.pathname;
	}

	const parts = path.split('/');
	const pathnameParts = location.pathname.split('/');

	for (let i = 0, len = parts.length; i < len; i += 1) {
		if (parts[i].indexOf(':') === 0) {
			if (!pathnameParts[i]) {
				return false;
			}
		} else {
			if (pathnameParts[i] !== parts[i]) {
				return false;
			}
		}
	}

	return true;
};

const parse = (path, location, config) => {
	const parts = path.split('/');
	const pathnameParts = location.pathname.split('/');

	const results = {};
	for (let i = 0, len = parts.length; i < len; i += 1) {
		if (parts[i].indexOf(':') === 0) {
			const key = parts[i].split(':')[1];
			results[key] = pathnameParts[i];
		}
	}

	return results;
};

export default {
	check,
	parse,
};
