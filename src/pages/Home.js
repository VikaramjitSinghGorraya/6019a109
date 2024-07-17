import React from 'react';
import { Container } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Activity from '../components/Activity';
import AlertDisplay from '../components/AlertDisplay';
const Home = () => {
	return (
		<Container
			borderTopRightRadius={10}
			borderTopLeftRadius={10}
			borderBottomRightRadius={10}
			borderBottomLeftRadius={10}
			w={['90%', '100%', '100%', '100%', '30%']}
			h={['90%', '90%', '90%', '90%', '100vh']}
			boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px;'}
			overflow={'auto'}
			my='5'
			py='5'
		>
			<Navbar />
			<Activity />
			<AlertDisplay />
		</Container>
	);
};

export default Home;
