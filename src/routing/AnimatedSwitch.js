import React, { useEffect, useState } from 'react';
import history from './history';

const AnimatedSwitch = ({
	children,
}) => {
	const { location } = window;

	const [current, setCurrent] = useState(null);
	const [prevRoute, setPrevRoute] = useState(null);

	const checkMatch = () => {
		let found = false;

		React.Children.forEach(children, (child) => {
			if (found) return;

			const { path, exact, onEnterBegin } = child.props;
			if (!path) return;

			let regexString = child.props.path;
			if (exact) {
				regexString += '$';
			}
			const regex = new RegExp(regexString);

			if (regex.test(location.pathname)) {
				const params = location.pathname.match(regex);

				const newRoute = {
					params: params.slice(1),
					pathname: location.pathname,
				};

				if (onEnterBegin) {
					onEnterBegin(newRoute);
				}

				if (!current) {
					setPrevRoute(newRoute);
					setCurrent(React.cloneElement(child, { route: newRoute }));
				} else if (child !== current) {
					const timeout = setTimeout(() => {
						setCurrent(React.cloneElement(child, { route: newRoute }));
					});

					const animation = {
						exit: true,
						confirmExiting: () => {
							clearTimeout(timeout);
						},
						onExit: () => {
							setCurrent(React.cloneElement(child, { route: newRoute }));
						},
					};

					setCurrent(React.cloneElement(current, { animation, route: prevRoute }));
					setPrevRoute(newRoute);
				}

				found = true;
			}
		});
	};

	useEffect(() => {
		checkMatch();
	}, []);

	useEffect(() => {
		const unlisten = history.listen(() => {
			checkMatch();
		});

		return unlisten;
	}, [current]);

	return (
		<>
			{current}
		</>
	);
};

export default AnimatedSwitch;
