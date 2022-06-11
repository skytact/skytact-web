import { Show, createSignal, children, createEffect } from "solid-js";
import { Navigate } from "solid-app-router";
import Loading from "./Loading";

import getAuthorized from "../fetch/getAuthorized";

const Author = async () => {
	const auth = await getAuthorized(); //return true, false or error string
	return typeof auth === "boolean" ? auth : Promise.reject(auth);
}

function AuthorZone (props) {
	//
	const fallback = children(() => props.fallback);
	const resolved = children(() => props.children);
	//signals
	const [authorized, setAuthorized] = createSignal("loading");
	//
	Author()
		.then(res => {
			console.log('res');
			setAuthorized(res);
		})
		.catch(err => {
			console.log(err);
		});
	createEffect(() => {
		if (authorized()) console.log(authorized());
	})
	//
	return (<>
		{
			authorized() == "loading"
			? <Loading />
			: authorized() === true
				? resolved()
				: fallback()
		}
	</>);
	//
	
}


export default AuthorZone;
