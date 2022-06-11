const useContactData = () => {
	const url = new URL(window.location.href);
	const nick = url.searchParams.get('n');
	const host = url.searchParams.get('h') || 'skytact-api.space';
	return [host, nick];
}

export default useContactData;
