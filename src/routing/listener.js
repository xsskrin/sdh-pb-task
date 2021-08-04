import envs from 'envs';
import history from './history';

const { __DEV } = envs;

const callbacks = [];
let callbacksLen = 0;

history.listen(function (location, action) {
	if (__DEV) {
		console.log('location changed', location);
	}
	let callback, len = callbacksLen;

	while (len) {
		len -= 1;
		callbacks[len](location, action);
	}
});

const match = function (regex) {
	return regex.test(history.location.pathname);
};

const addCallback = function (callback) {
	callbacks.push(callback);
	callbacksLen += 1;

	callback();

	return function () {
		const index = callbacks.indexOf(callback);
		if (index > -1) {
			callbacks.splice(index, 1);
			callbacksLen -= 1;
		}
	};
};

const addPatternCallback = function (pattern, fn) {
	const regex = new RegExp(pattern);

	const callback = function () {
		if (match(regex)) {
			fn();
		}
	};

	console.log('pattern callback added', pattern);
	return addCallback(callback);
};

const listener = {
	match,
	addCallback,
	addPatternCallback,
};

export default listener;
