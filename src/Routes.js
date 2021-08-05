import React from 'react';
import { Switch } from 'routing';
import CompanyDetailsPage from 'pages/CompanyDetails';
import PortfolioPage from 'pages/Portfolio';
import Page404 from 'pages/404';

const Routes = () => {
	return (
		<Switch>
			<PortfolioPage exact path="/" />
			<CompanyDetailsPage path="/company/:companySymbol" />
			<Page404 anyway />
		</Switch>
	);
};

export default Routes;
