import React from 'react';
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	useDisclosure,
	CloseButton,
	Box,
	Center,
} from '@chakra-ui/react';
const AlertDisplay = () => {
	const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

	return isVisible ? (
		<Center>
			<Alert
				status='info'
				position={'absolute'}
				top={'50%'}
				w={['90%', '90%', '70%', '70%', '40%']}
			>
				<AlertIcon />
				<Box>
					<AlertTitle>React Query Issues!</AlertTitle>
					<AlertDescription>
						Due to some issues with React Query, you may have to click buttons
						twice to update the data
					</AlertDescription>
				</Box>
				<CloseButton
					alignSelf='flex-start'
					position='relative'
					right={-1}
					top={-1}
					onClick={onClose}
				/>
			</Alert>
		</Center>
	) : (
		''
	);
};

export default AlertDisplay;
