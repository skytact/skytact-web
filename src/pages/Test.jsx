import { Show, createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { Link, Navigate } from "solid-app-router";
//components
import HyperCard from "../components/HyperCard";
import ErrorPlace from "../components/ErrorPlace";

//fetch
import getUsecard from "../fetch/getUsecard";

//fetching
const useCard = async () => {
	const answ = await getUsecard();
	if (answ == false) {
		return Promise.reject("no authorized!");
	}
	if (typeof answ == "object") {
		return answ;
	} else return Promise.reject(answ);
}

function __TEST$ () {
	//signals
	const [error, setError] = createSignal("");
	const [data, setData] = createStore({card: false});
	//fetch query
	useCard()
		.then(res=>{
			setData({card: res});
		})
		.catch(err=>{
			console.log(err);
			setError(err);
		});
	//
	return (
		<Show when = {data.card} fallback = {<ErrorPlace error = {error} />}>
			<HyperCard 
				userPermission = { data.card.pack[0] }
				initialMode = { "edit" }
				initialCard = { data.card }
			/>
		</Show>
	);
}

export default __TEST$;
