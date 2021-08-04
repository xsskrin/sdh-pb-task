import React from 'react';
import styled from 'styled-components';
import { primary } from 'colors';

const Label = styled.div`
	margin-bottom: 8px;
	margin-left: 8px;
	${props => props.spaceTop && 'margin-top: 16px;'}
	color: ${primary};
	font-weight: bold;
`;

export default Label;
