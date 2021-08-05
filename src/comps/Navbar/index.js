import React from 'react';
import styled from 'styled-components';

const StyledNavbar = styled.div`
	flex-shrink: 0;
	background: #fff;
	box-shadow: 1px 2px 3px rgba(0, 0, 0, .25);
	padding: 16px;
`;

const Title = styled.div`
	color: #16a085;
	font-size: 32px;
	line-height: 1.15;
	margin-bottom: 4px;
`;

const Item = styled.div`
	color: #000;
	font-size: 24px;
	line-height: 1.15;
`;

const Navbar = () => {
	return (
		<StyledNavbar>
			<Title>SDH Homework</Title>
			<Item>Portfolio</Item>
		</StyledNavbar>
	);
};

export default Navbar;
