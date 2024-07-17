import React from 'react';
import { Container } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Activity from '../components/Activity';

const Home = () => {
	return (
		<Container
			borderTopRightRadius={10}
			borderTopLeftRadius={10}
			borderBottomRightRadius={10}
			borderBottomLeftRadius={10}
			w={['90%', '30%', '30%', '30%']}
			h={['90%', '', '', '100vh']}
			boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'}
			overflow={'auto'}
			mb='5'
			pb='5'
		>
			<Navbar />
			<Activity />
		</Container>
	);
};

export default Home;
