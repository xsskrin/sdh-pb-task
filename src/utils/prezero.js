const prezero = (num) => {
	const n = +num;
	if (isNaN(n)) return num;
	if (n < 10) return '0' + n;
	return n;
};

export default prezero;
