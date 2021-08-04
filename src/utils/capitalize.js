const capitalize = (str) => {
	if (typeof str !== 'string' || !str.length) return str;
	return str[0].toUpperCase() + str.substr(1).toLowerCase();
};

export default capitalize;
