import React from 'react';
import { HStack, Text, Box, VStack, Heading, Button } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { useBattery } from 'react-use';
import {
	useGetCalls,
	useArchiveAllCalls,
	useUnArchiveCalls,
} from '../queries/Queries';
import moment from 'moment';
import Back from '../icons/back.png';
const Navbar = () => {
	const { data: callsData } = useGetCalls();
	const numberOfCalls = callsData?.filter((call) => !call.is_archived);
	const unArchiveCall = useUnArchiveCalls();
	const archiveAllCalls = useArchiveAllCalls();
	const queryClient = useQueryClient();

	//Functions to Display Date and Time on Top
	const date = moment().format('MM DD');
	const day = moment().format('dddd').substring(0, 3);
	const time = moment().format('HH : mm');

	//Fucntion to UnArchive All Calls
	const unArchiveHandler = () => {
		unArchiveCall.mutate();

		if (unArchiveCall.isSuccess) {
			queryClient.invalidateQueries({
				queryKey: 'allCalls',
			});
		}
	};

	//Function to Archive All Calls
	const archiveHandler = (callsData) => {
		archiveAllCalls.mutate(callsData);

		if (unArchiveCall.isSuccess) {
			queryClient.invalidateQueries({
				queryKey: 'allCalls',
			});
		}
	};
	return (
		<VStack
			bgSize={'70%'}
			bgPos={'center'}
			bgImage={Back}
			bgRepeat={'no-repeat'}
		>
			<HStack w='100%' justifyContent={'space-between'} h='10'>
				<Text as='small' fontWeight={'500'}>
					{time}
				</Text>
				<Box h='5' w='20' bgColor={'black'} borderRadius={'10'}></Box>
				<Text as='small' fontWeight={'500'}>
					{/*Display Realtime Battery Percentage of Device */}
					{Math.round(useBattery().level * 100)}%
				</Text>
			</HStack>
			<VStack alignItems={'flex-start'} w='100%'>
				<Text as='small' fontWeight={'500'}>
					Hi There!
				</Text>
				<Heading as='h1' fontWeight={'400'}>
					{date} {day}
				</Heading>
				<HStack w='100%'>
					<Button
						type='tel'
						bg='black'
						py='1'
						px='3'
						borderRadius={'20'}
						onClick={() => {
							archiveHandler(callsData);
						}}
					>
						<Text textAlign={'center'} color={'white'} as='small'>
							+ Archive all calls
						</Text>
					</Button>
					<Button
						type='tel'
						bg='black'
						py='1'
						px='3'
						borderRadius={'20'}
						onClick={unArchiveHandler}
					>
						<Text textAlign={'center'} color={'white'} as='small'>
							+ Unarchive all calls
						</Text>
					</Button>
				</HStack>

				<Text as='small' color={'gray'} fontWeight={'500'}>
					{numberOfCalls?.length} calls for today
				</Text>
			</VStack>
		</VStack>
	);
};

export default Navbar;
