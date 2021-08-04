import React from 'react';
import styled, { keyframes } from 'styled-components';
import { primary } from 'colors';

const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

const Spinner = styled.div`
	width: 24px;
	height: 24px;
	background: ${primary};
	animation: ${rotate} 1s linear infinite;
	margin: 16px auto;
`;

export default Spinner;
