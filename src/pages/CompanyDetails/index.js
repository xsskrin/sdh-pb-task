import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spinner } from 'comps';
import { api } from 'utils';
import { history } from 'routing';
import { primary } from 'colors';

const formatMoney = (money) => {
	money = +money;
	if (isNaN(money)) {
		return 'N/A';
	}

	if (money >= 1000000000000) {
		return (money / 1000000000000).toFixed(2) + ' bln';
	}
	if (money >= 1000000000) {
		return (money / 1000000000).toFixed(2) + ' mld';
	}
	if (money >= 1000000) {
		return (money / 1000000).toFixed(2) + ' mln';
	}
	if (money >= 1000) {
		return (money / 1000).toFixed(2) + ' tys';
	}
	return money;
};

const CompanyDetailsWrapper = styled.div`
	padding: 32px;
`;

const Name = styled.div`
	font-size: 32px;
	margin-bottom: 16px;
`;

const Info = styled.div`

`;

const Description = styled.div`
	margin-top: 32px;
	max-width: 800px;
`;

const Back = styled.div`
	font-size: 20px;
	margin-bottom: 16px;
	cursor: pointer;

	&:hover {
		color: ${primary};
	}
`;

const EmptyInfo = styled.div`
	font-style: italic;
	font-size: 16px;
`;

const TryIBM = styled.div`
	background: ${primary};
	color: #fff;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, .25);
	padding: 6px 16px;
	border-radius: 4px;
	display: inline-block;
	font-size: 20px;
	font-weight: bold;
	margin-top: 16px;
	cursor: pointer;
`;

const CompanyDetailsPage = ({
	urlParams,
}) => {
	const [company, setCompany] = useState(null);
	const [loading, setLoading] = useState(false);
	const { companySymbol } = urlParams;

	useEffect(() => {
		setLoading(true);

		api.get(`/query?function=OVERVIEW&symbol=${companySymbol}&apikey=demo`)
			.then((data) => {
				if (data.Name && data.Symbol) {
					data.formattedMarketCapitalization = formatMoney(data.MarketCapitalization);
					setCompany(data);
				}

				setLoading(false);
			});
	}, [companySymbol]);

	return (
		<CompanyDetailsWrapper>
			<Back onClick={() => history.goBack()}>Back</Back>
			{loading && (
				<Spinner />
			)}
			{!loading && !company && (
				<>
					<EmptyInfo>Company not found</EmptyInfo>
					<TryIBM
						onClick={() => {
							history.push('/company/IBM');
						}}
					>
						Try IBM instead
					</TryIBM>
				</>
			)}
			{company && (
				<>
					<Name>{company.Name}</Name>
					<Info>
						<strong>Address:</strong>
						&nbsp;{company.Address}
					</Info>
					<Info>
						<strong>Market capitalization:</strong>
						&nbsp;{company.formattedMarketCapitalization}
					</Info>
					<Description>
						{company.Description}
					</Description>
				</>
			)}
		</CompanyDetailsWrapper>
	);
};

export default CompanyDetailsPage;
