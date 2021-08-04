import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Input } from '@chakra-ui/react';
import $portfolio from '../service';

const SearchInput = ({

}) => {
	useEffect(() => {
		setTimeout(() => {
			$portfolio.search('tesco');
		});
	}, []);

	return (
		<Input
			defaultValue="tesco"
			placeholder="Example: tesco"
			onChange={(e) => {
				$portfolio.search(e.target.value);
			}}
		/>
	);
};

export default SearchInput;
