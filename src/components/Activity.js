import React, { useState } from 'react';
import {
	HStack,
	VStack,
	Text,
	Image,
	Button,
	Divider,
	Box,
	Tooltip,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Call from './Call';
import { useQueryClient } from 'react-query';
import { useGetCalls, useArchiveCall } from '../queries/Queries';
import Archive from '../icons/archive.png';
import OutboundAccepted from '../icons/outboundAccepted.png';
import OutboundRejected from '../icons/outboundRejected.png';
import InboundAccepted from '../icons/inboundAccepted.png';
import InboundRejected from '../icons/inboundRejected.png';
import Info from '../icons/info.png';

const Activity = () => {
	//GET Calls Data on Mount
	const { data: callsData } = useGetCalls();

	//Will Be Used to Modify Archive Status
	const makeArchive = useArchiveCall();

	//Will Be Used To Invalidate Already Fetched Data
	const queryClient = useQueryClient();

	//Pssing Call Information To Modal To Display Call Data
	const [displayCallDetails, setDisplayCallDetails] = useState({
		displayDetails: false,
		cameFrom: '',
		madeTo: '',
		duration: '',
		direction: '',
		status: '',
	});

	//Hanldes Modifying The Archived Status Of The Call
	const archiveHandler = (callInfo) => {
		makeArchive.mutate(callInfo);

		//Reftecth The Calls if status change was success
		if (makeArchive.isSuccess) {
			queryClient.refetchQueries({
				queryKey: 'allCalls',
			});
		}
	};

	return (
		<HStack h='100%'>
			<VStack p='1' h='100%' w='100%' alignItems={'flex-start'}>
				<Tabs mx='auto' w='100%' overflow={'hidden'}>
					<TabList>
						<Tab w='50%' bgColor={'#96c5c4'}>
							All Calls
						</Tab>
						<Tab w='50%' bgColor={'#eec789'}>
							Archived
						</Tab>
					</TabList>

					<TabPanels h='100%'>
						<TabPanel h='100%' pb='10' overflow={'auto'}>
							{callsData
								?.filter((call) => !call.is_archived)
								.map((call, index) => (
									<Box key={index}>
										<HStack justifyContent={'space-between'}>
											<HStack>
												<Image
													src={
														call.direction === 'inbound' &&
														call.call_type === 'answered'
															? InboundAccepted
															: call.direction === 'inbound' &&
															  call.call_type === 'missed'
															? InboundRejected
															: call.direction === 'outbound' &&
															  call.call_type === 'answered'
															? OutboundAccepted
															: call.direction === 'outbound' &&
															  call.call_type === 'missed'
															? OutboundRejected
															: ''
													}
													h='5'
													w='5'
												/>
												<Text as='small' fontWeight={'500'}>
													{call.from}
												</Text>
											</HStack>
											<Button
												bg='transparent'
												onClick={(e) =>
													setDisplayCallDetails({
														displayDetails: true,
														direction: call.direction,
														duration: call.duration,
														cameFrom: call.from,
														madeTo: call.to,
														status: call.call_type,
													})
												}
											>
												<Tooltip label='Call Information'>
													<Image h='5' w='5' mr='1' src={Info} />
												</Tooltip>
											</Button>
											<Button
												bg='transparent'
												onClick={() => archiveHandler(call)}
											>
												<Tooltip label='Archive Call'>
													<Image h='5' w='5' mr='1' src={Archive} />
												</Tooltip>
											</Button>
										</HStack>
										<Divider my='1' border={'7px solid gray.900'} />
									</Box>
								))}
						</TabPanel>
						<TabPanel h='100%' pb='10' overflow={'auto'}>
							{callsData
								?.filter((call) => call.is_archived)
								.map((call, index) => (
									<Box Box key={index}>
										<HStack justifyContent={'space-between'}>
											<HStack>
												{/*Display Call Icons based on if it was inbound, outbound, answered or missed*/}
												<Image
													src={
														call.direction === 'inbound' &&
														call.call_type === 'answered'
															? InboundAccepted
															: call.direction === 'inbound' &&
															  call.call_type === 'missed'
															? InboundRejected
															: call.direction === 'outbound' &&
															  call.call_type === 'answered'
															? OutboundAccepted
															: call.direction === 'outbound' &&
															  call.call_type === 'missed'
															? OutboundRejected
															: ''
													}
													h='5'
													w='5'
												/>
												<Text as='small' fontWeight={'500'}>
													{call.from}
												</Text>
											</HStack>
											<Button
												bg='transparent'
												onClick={(e) =>
													setDisplayCallDetails({
														displayDetails: true,
														direction: call.direction,
														duration: call.duration,
														cameFrom: call.from,
														madeTo: call.to,
														status: call.call_type,
													})
												}
											>
												<Tooltip label='Call Information'>
													<Image h='5' w='5' mr='1' src={Info} />
												</Tooltip>
											</Button>
											<Button
												bg='transparent'
												onClick={() => archiveHandler(call)}
											>
												<Tooltip label='Unarchive Call'>
													<Image h='5' w='5' mr='1' src={Archive} />
												</Tooltip>
											</Button>
										</HStack>
										<Divider my='1' border={'7px solid gray.900'} />
									</Box>
								))}
						</TabPanel>
					</TabPanels>
				</Tabs>
			</VStack>
			<VStack></VStack>

			{/*Called The Modal To Display Call Info*/}
			<Call
				displayCallDetails={displayCallDetails}
				setDisplayCallDetails={setDisplayCallDetails}
			/>
		</HStack>
	);
};

export default Activity;
