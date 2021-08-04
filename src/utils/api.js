import axios from 'axios';

const api = axios.create({
	baseURL: 'https://www.alphavantage.co',
});

const enhancers = [];

api.enhance = (fn) => {
	enhancers.push(fn);

	return () => {
		const index = enhancers.indexOf(fn);
		enhancers.splice(index, 1);
	};
};

api.interceptors.request.use((config) => {
	enhancers.forEach((en) => en(config));
	return config;
});

api.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(err) => {
		if (err.__CANCEL__) {
			return { cancelled: true };
		}

		const { response } = err;

		if (!response) {
			console.error("Can't connect to server");

			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(api(err.config));
				}, 3000);
			});
		}

		const { status } = response;
		if (status !== 401) {
			const error = err.response.data;
			error.originalError = err;

			console.error(error);
			throw error;
		}

		throw {
			error: err,
			data: err.response.data,
		};
	},
);

export default api;
