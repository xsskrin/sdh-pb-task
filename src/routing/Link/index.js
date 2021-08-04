import React, { useEffect } from 'react';
import classnames from 'classnames';
import { noop, useRefresh } from 'utils';
import history from '../history';
import './link.sass';

const Link = ({
	to,
	children,
	activeClassName,
	activeExact,
	className,
	replace = false,
	onClick = noop,
	...rest
}) => {
	const refresh = useRefresh();

	const cls = classnames('link', className, {
		[activeClassName]: activeExact
			? window.location.pathname === to
			: window.location.pathname.indexOf(to) === 0,
	});

	useEffect(() => {
		return history.listen(refresh);
	}, []);

	return (
		<div
			data-to={to}
			className={cls}
			onClick={(event) => {
				event.preventDefault();
				onClick(event);

				if (window.location.pathname === to) {
					return false;
				}

				if (replace) {
					history.replace(to);
				} else {
					history.push(to);
				}
			}}
			{...rest}
		>
			{children}
		</div>
	);
};

export default Link;
