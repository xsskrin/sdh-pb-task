import React from 'react';
import { history } from 'routing';
import styled from 'styled-components';
import { primary, negative } from 'colors';
import { useService } from 'utils';
import { Spinner } from 'comps';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import $portfolio from '../service';

const StyledSearchResults = styled.div`
	padding: 8px;
	border-radius: 4px;
	background: rgba(0, 0, 0, .04);
`;

const StyledItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 16px;
	border-radius: 4px;
	border: 1px solid #ccc;
	margin-bottom: 8px;
	&:last-child {
		margin-bottom: 0;
	}
`;

const RemoveBtn = styled.div`
	padding: 8px 16px;
	border-radius: 4px;
	background: ${negative};
	color: #fff;
	text-shadow: 1px 1px 1px rgba(0, 0, 0, .25);
	cursor: pointer;
`;

const StyledTr = styled(Tr)`
	cursor: pointer;
	&:hover {
		color: ${primary};
	}
`;

const SavedItems = () => {
	useService($portfolio, [
		'setSavedItems',
	]);

	const { savedItems, loading } = $portfolio.state;

	return (
		<StyledSearchResults>
			{loading && (
				<Spinner />
			)}
			<Table>
				<Thead>
					<Tr>
						<Th>Company name</Th>
						<Th>Symbol</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>
				<Tbody>
					{savedItems.map((result) => {
						return (
							<StyledTr
								key={result.symbol}
								onClick={() => {
									history.push(`/company/${result.symbol}`);
								}}
							>
								<Td>{result.name}</Td>
								<Td>{result.symbol}</Td>
								<Td>
									<RemoveBtn
										onClick={(e) => {
											e.stopPropagation();
											$portfolio.removeItem(result);
										}}
									>
										Remove
									</RemoveBtn>
								</Td>
							</StyledTr>
						);
					})}
				</Tbody>
			</Table>
		</StyledSearchResults>
	);
};

export default SavedItems;
