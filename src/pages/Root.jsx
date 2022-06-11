import { Show } from "solid-js";
import { Navigate } from "solid-app-router";
//
function Root () {
	//
	const link = localStorage.getItem("__log$") || false;
	const ref = link ? ("/c/" + link) : false;
	return (<>
		{
			ref
				? <Navigate href = "/e" />
				: <Navigate href = "/h" />
		}
	</>);
}
//
export default Root;
