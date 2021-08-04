import React, { useState, useEffect, useMemo } from 'react';

const states = {
	ENTER: 1,
	ENTERING: 2,
	ENTERED: 3,
	EXITING: 4,
	EXITED: 5,
};

class $Animate {
	constructor(show) {
		this.show = show;

		this.state = null;
		this.callback = null;
		this.observer = null;
	}

	setState(state) {
		this.state = state;
		if (this.observer) this.observer(state);
	}

	set(show) {
		if (show === this.show) return false;
		this.show = show;

		if (this.callback) {
			this.callback(show);
			if (show) {
				if (this.state !== states.ENTERING) {
					this.setState(states.ENTERED);
				}
			} else if (this.state !== states.EXITING) {
				this.setState(states.EXITED);
			}
		} else if (show) {
			this.setState(states.ENTER);
		}
	}

	listen(callback) {
		this.callback = callback;
		callback(this.show);

		return () => {
			this.callback = null;
		};
	}

	observe(observer) {
		this.observer = observer;
	}

	entering = () => {
		this.setState(states.ENTERING);
	}

	entered = () => {
		this.setState(states.ENTERED);
	}

	exiting = () => {
		this.setState(states.EXITING);
	}

	exited = () => {
		this.setState(states.EXITED);
	}
}

const withAnimation = (Component) => {
	const WithAnimationComponent = ({ show, ...rest }) => {
		const [state, setState] = useState(show ? null : states.EXITED);

		const $animate = useMemo(() => {
			return new $Animate(show);
		}, []);

		useEffect(() => {
			$animate.observe(setState);
		}, []);

		useEffect(() => {
			$animate.set(show);
		}, [show]);

		if (state === states.EXITED) {
			return null;
		} else {
			return (
				<Component
					show={show}
					$animate={$animate}
					{...rest}
				/>
			);
		}
	};

	return WithAnimationComponent;
};

export default withAnimation;
