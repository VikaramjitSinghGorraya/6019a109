import { HStack } from '@chakra-ui/react';
import './App.css';
import Home from './pages/Home';

function App() {
	return (
		<HStack w='100%' h={['100vh', '100vh', '90vh', '90vh', '100vh']}>
			<Home />
		</HStack>
	);
}

export default App;
