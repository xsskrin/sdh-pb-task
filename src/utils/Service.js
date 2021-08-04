import envs from 'envs';

const { __DEV } = envs;

class Service {
	constructor(name, initialState, methods) {
		this.state = initialState;
		this.cbs = {};
		this.name = name;

		Object.keys(methods).forEach((k) => {
			const method = methods[k].bind(this);
			this[k] = (...args) => {
				console.log(
					`%c${this.name}: %c${k}`,
					'color: #2ecc71; font-weight: bold',
					'color: #3498db; font-weight: bold',
				);
				method(...args);
				this.fire(k);
			};
		});
	}

	set(newState) {
		if (__DEV) {
			console.log('Extending state', newState);
		}
		Object.assign(this.state, newState);
		if (__DEV) {
			console.log('New state', this.state);
		}
	}

	fire(name, ...args) {
		console.log('Firing event:', name);
		const cbs = this.cbs[name];
		if (!cbs) return false;

		let i = 0, len = cbs.length;
		while (i < len) {
			cbs[i](...args);
			i += 1;
		}
	}

	on(name, cb) {
		let cbs = this.cbs[name];
		if (!cbs) {
			cbs = this.cbs[name] = [];
		}

		cbs.push(cb);
	}

	off(name, cb) {
		const cbs = this.cbs[name];
		if (!cbs) return false;

		const index = cbs.indexOf(cb);
		if (index > -1) {
			cbs.splice(index, 1);
		}
	}
}

export default Service;
