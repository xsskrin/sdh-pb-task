import React, { useEffect, useState } from 'react';
import listener from './listener';

const Route = ({
	path,
	children,
	component,
}) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		return listener.addPatternCallback(path, () => {
			setShow(true);
		});
	}, []);

	if (show) {
		if (component) {
			return React.createElement(component, null, children);
		} else if (children) {
			return children;
		}
	}

	return null;
};

export default Route;
