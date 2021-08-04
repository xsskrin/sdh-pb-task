import React from 'react';
import Navbar from 'comps/Navbar';
import styled from 'styled-components';

const StyledAppView = styled.div`
	background: #f2f3f7;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const AppView = ({ children }) => {
	return (
		<StyledAppView>
			<Navbar />
			{children}
		</StyledAppView>
	);
};

export default AppView;
