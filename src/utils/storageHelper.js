const { localStorage } = window;

const STORAGE_NAMESPACE = 'SDH_HOMEWORK';
const namespaceKey = (key) => {
	return `${STORAGE_NAMESPACE}:${key}`;
};

const storageHelper = {
	setItem(key, value) {
		return localStorage.setItem(namespaceKey(key), JSON.stringify(value));
	},

	getItem(key) {
		const value = localStorage.getItem(namespaceKey(key));
		try {
			return JSON.parse(value);
		} catch (e) {
			return undefined;
		}
	},

	removeItem(key) {
		return localStorage.removeItem(namespaceKey(key));
	},
};

export default storageHelper;
