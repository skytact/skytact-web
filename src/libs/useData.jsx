const useData = () => {
	const link = localStorage.getItem("__log$") || false;
	const token = localStorage.getItem("__set$") || false;
	if (!link || !token) {
		localStorage.setItem("__log$", "");
		localStorage.setItem("__set$", "");
		return ["", ""];
	}
	return [link, token];
}

export default useData;
