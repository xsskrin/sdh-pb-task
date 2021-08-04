import React from 'react';
import { Link } from 'routing';
import './404.sass';

const Page404 = () => {
	return (
		<div className="page-404">
			<div className="page-404-title">
				404
			</div>
			<div className="page-404-subtitle">
				Looking for something?
			</div>
			<div className="page-404-try">
				What is essential is invisible to the eye.
				It's only with the heart that you can see rightly.
			</div>
			<div className="page-404-options">
				<Link
					className="page-404-back"
					to="/"
					replace
				>
					Back to Homework
				</Link>
			</div>
		</div>
	);
};

export default Page404;
