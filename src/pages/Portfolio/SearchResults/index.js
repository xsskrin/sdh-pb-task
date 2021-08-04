import React from 'react';
import styled from 'styled-components';
import { history } from 'routing';
import { primary, info } from 'colors';
import { useService } from 'utils';
import { Spinner } from 'comps';
import $portfolio from '../service';

const StyledSearchResults = styled.div`
	border: 2px solid ${primary};
	padding: 8px;
	border-radius: 4px;
`;

const StyledItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 16px;
	border-radius: 4px;
	border: 1px solid #ccc;
	margin-bottom: 8px;
	background: #fff;
	cursor: pointer;
	&:last-child {
		margin-bottom: 0;
	}
	&:hover {
		background: #fcfcfc;
	}
`;

const PlusBtn = styled.div`
	padding: 8px 16px;
	border-radius: 4px;
	background: ${primary};
	color: #fff;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, .25);
	cursor: pointer;
	&[disabled] {
		background: #ccc;
		color: #888;
		text-shadow: 1px 1px 1px rgba(0, 0, 0, 0);
		cursor: default;
	}
`;

const EmptyInfo = styled.div`
	font-style: italic;
	font-size: 16px;
`;

const OwnedInfo = styled.div`
	color: ${info};
	font-weight: bold;
	font-style: italic;
	margin-left: 16px;
`;

const ItemText = styled.div`
	flex-grow: 1;
	display: flex;
`;

const Item = ({ data, owned }) => (
	<StyledItem
		onClick={() => {
			history.push(`/company/${data.symbol}`);
		}}
	>
		<ItemText>
			{data.symbol} - {data.name}
			{owned && <OwnedInfo>Owned</OwnedInfo>}
		</ItemText>
		<PlusBtn
			onClick={(e) => {
				e.stopPropagation();

				if (!owned) {
					$portfolio.addItem(data);
				}
			}}
			disabled={owned}
		>
			Add to portfolio
		</PlusBtn>
	</StyledItem>
);

const SearchResults = () => {
	useService($portfolio, [
		'setResults',
		'setLoading',
		'setSavedItems',
	]);

	const { results, savedItems, loading } = $portfolio.state;

	return (
		<StyledSearchResults>
			{loading && (
				<Spinner />
			)}
			{!loading && (!results || !results.length) && (
				<EmptyInfo>
					No companies found, because this API works almost only for tesco
				</EmptyInfo>
			)}
			{results.map((result) => {
				return (
					<Item
						key={result.symbol}
						data={result}
						owned={Boolean(savedItems.filter((a) => {
							return a.symbol === result.symbol;
						}).length)}
					/>
				);
			})}
		</StyledSearchResults>
	);
};

export default SearchResults;
