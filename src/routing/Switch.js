import React, { useEffect, useMemo, useState } from 'react';
import history from './history';
import listener from './listener';
import urlMatcher from './urlMatcher';

const Switch = ({ children }) => {
	const childrenArray = useMemo(() => {
		return React.Children.map(children, (child) => {
			const { path, children, ...options } = child.props;

			return {
				path,
				options,
				children,
				element: child,
			};
		});
	}, [children]);

	const [childToRender, setChildToRender] = useState(null);

	useEffect(() => {
		return listener.addCallback(() => {
			let child;
			let matched = false;
			for (let i = 0, len = childrenArray.length; i < len; i += 1) {
				child = childrenArray[i];

				if (child.options.anyway) {
					setChildToRender(React.cloneElement(
						child.element, {}, child.children,
					));

					matched = true;
					break;
				}

				if (child.options.regex) {
					const regex = new RegExp('^' + child.path);

					if (regex.test(history.location.pathname)) {
						setChildToRender(React.cloneElement(
							child.element, {}, child.children,
						));

						matched = true;
						break;
					}
				} else {
					const matching = urlMatcher.check(
						child.path, history.location, child.options,
					);

					if (matching) {
						const urlParams = urlMatcher.parse(
							child.path, history.location, child.options,
						);

						setChildToRender(React.cloneElement(
							child.element, { urlParams }, child.children,
						));

						matched = true;
						break;
					}
				}
			}

			if (!matched) {
				setChildToRender(null);
			}
		});
	}, []);

	return childToRender;
};

export default Switch;
