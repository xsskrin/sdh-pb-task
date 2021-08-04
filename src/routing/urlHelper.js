import qs from 'query-string';
import history from './history';

const memory = [];

const urlHelper = {
	getParams() {
		const paramsStr = window.location.search || '';
		return qs.parse(paramsStr) || {};
	},

	removeParam(name) {
		const currentParams = qs.parse(window.location.search);

		if (currentParams[name]) {
			delete currentParams[name];

			const newStr = qs.stringify(currentParams);

			let newPath = window.location.pathname;
			if (newStr.length) {
				newPath += `?${newStr}`;
			}

			history.push(newPath);
		}
	},

	setParam(name, value) {
		const currentParams = qs.parse(window.location.search);

		currentParams[name] = value;

		const newStr = qs.stringify(currentParams);

		let newPath = window.location.pathname;
		if (newStr.length) {
			newPath += `?${newStr}`;
		}

		history.push(newPath);
	},

	goBack() {
		if (memory.length > 1) {
			memory.pop();
			history.push(memory[memory.length - 1]);
		} else {
			history.goBack();
		}
	},
};

history.listen((loc) => {
	memory.push(loc);
});

export default urlHelper;
