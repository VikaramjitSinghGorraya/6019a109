import { useQuery, useMutation } from 'react-query';
const BACKENDURL = process.env.REACT_APP_BACKEND_URL;

//------------------------CALL RETRIEVE QUERIES------------------------------------

export const getAllCalls = async () => {
	const response = await fetch(`${BACKENDURL}/activities`);
	const calls = await response.json();
	return calls;
};

export const useGetCalls = () => {
	return useQuery(['allCalls'], () => getAllCalls(), {
		refetchOnWindowFocus: false,
		cacheTime: '0',
		staleTime: '0',
	});
};

//--------------------------ARCHIVE QUERIES------------------------------------
export const archiveCall = async (callInfo) => {
	const calls = await fetch(`${BACKENDURL}/activities/${callInfo.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify({ is_archived: !callInfo.is_archived }),
	});
	return calls.status;
};

export const archiveAllCalls = async (allCalls) => {
	const calls = await allCalls.map((call) => {
		fetch(`${BACKENDURL}/activities/${call.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({ is_archived: true }),
		});
	});

	return calls.status;
};

export const unArchiveCalls = async () => {
	const calls = await fetch(`${BACKENDURL}/reset`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	return calls.status;
};

export const useArchiveCall = () => {
	return useMutation(['archive'], (callInfo) => archiveCall(callInfo), {
		retry: false,
	});
};

export const useArchiveAllCalls = () => {
	return useMutation(
		['archiveAllCalls'],
		(allCalls) => archiveAllCalls(allCalls),
		{
			retry: false,
		}
	);
};

export const useUnArchiveCalls = () => {
	return useMutation(['unArchiveAllCalls'], () => unArchiveCalls(), {
		retry: false,
	});
};
