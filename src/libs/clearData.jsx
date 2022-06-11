const clearData = () => {
	localStorage.setItem("__log$", "");
	localStorage.setItem("__set$", "");
	return true;
}

export default clearData;
