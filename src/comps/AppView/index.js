import React from 'react';
import Navbar from 'comps/Navbar';
import styled from 'styled-components';

const StyledAppView = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const Content = styled.div`
	flex-grow: 1;
	min-height: 0;
	background: #f2f3f7;
	overflow: auto;
`;

const AppView = ({ children }) => {
	return (
		<StyledAppView>
			<Navbar />
			<Content>
				{children}
			</Content>
		</StyledAppView>
	);
};

export default AppView;
