import React from 'react';
import styled from 'styled-components';
import { Label } from 'comps';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';
import SavedItems from './SavedItems';

const PortfolioWrapper = styled.div`
	padding: 8px;
	min-height: 100%;
	flex-grow: 1;
	display: flex;
	align-items: flex-start;
`;

const Half = styled.div`
	width: 50%;
	padding: 16px;
`;

const Separator = styled.div`
	width: 2px;
	flex-shrink: 0;
	min-height: 100%;
	background: #ccc;
	align-self: stretch;
`;

const PortfolioPage = () => {
	return (
		<PortfolioWrapper>
			<Half>
				<Label>Company name</Label>
				<SearchInput />
				<Label spaceTop>Search results</Label>
				<SearchResults />
			</Half>
			<Separator />
			<Half>
				<Label>Your portfolio</Label>
				<SavedItems />
			</Half>
		</PortfolioWrapper>
	);
};

export default PortfolioPage;
