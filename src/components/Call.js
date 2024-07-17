import React from 'react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Text,
	VStack,
	Image,
	HStack,
} from '@chakra-ui/react';
import CallReceived from '../icons/callReceived.png';
import CallMissed from '../icons/callMissed.png';
import Duration from '../icons/duration.png';
import Contact from '../icons/contact.png';

const Call = ({ displayCallDetails, setDisplayCallDetails }) => {
	return (
		<>
			<Modal
				isOpen={displayCallDetails.displayDetails}
				onClose={() =>
					setDisplayCallDetails({
						displayDetails: false,
					})
				}
			>
				<ModalOverlay />
				<ModalContent w='30%'>
					<ModalHeader>Call Details</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack>
							<HStack>
								<Image src={Contact} h='5' w='5' />
								{displayCallDetails.direction === 'inbound' ? (
									<Text as='p' fontWeight={'500'}>
										Caller: {displayCallDetails.cameFrom}
									</Text>
								) : (
									<Text as='p' fontWeight={'500'}>
										Called: {displayCallDetails.madeTo}
									</Text>
								)}
							</HStack>

							<HStack>
								<Image src={Duration} h='5' w='5' />
								<Text as='p' fontWeight={'500'}>
									Duration: {displayCallDetails.duration} sec
								</Text>
							</HStack>
							<HStack>
								<Image
									src={
										displayCallDetails.status === 'missed'
											? CallMissed
											: CallReceived
									}
									h='5'
									w='5'
								/>
								<Text as='p' fontWeight={'500'}>
									Call Status: {displayCallDetails.status}
								</Text>
							</HStack>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							bg='#96c5c4'
							color={'white'}
							m='auto'
							onClick={() => {
								setDisplayCallDetails({
									displayDetails: false,
								});
							}}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Call;
