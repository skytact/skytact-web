import {Show, createSignal} from "solid-js";
import {createStore} from "solid-js/store";
import {useParams} from "solid-app-router";
import CardScene from "../components/CardScene";
import Loading from "../components/Loading";

import getAuthorized from "../fetch/getAuthorized";
import getGetAddr from "../fetch/getGetAddr";
import getGetAccs from "../fetch/getGetAccs";
import getUpdSign from "../fetch/getUpdSign";
import getGetcard from "../fetch/getGetcard";
import getUsecard from "../fetch/getUsecard";
import getContact from "../fetch/getContact";

//
const useContact = async (host, nick) => {
	try {
		//required
		const addr = await getGetAddr(host, nick);
		//
		const accs = "";
		const [pubk, sign] = (addr) ? await getUpdSign(addr) : ["", ""];
		const answ = (nick && pubk && sign)
			? await getContact(host, nick, pubk, sign)
			: false;
		if (!answ) return Promise.reject("act canceled!")
		return answ;
	} catch (err) {
		return Promise.reject(err);
	}
}

//
const useGetcard = async (host, nick) => {
	try {
		//required
		const addr = await getGetAddr(host, nick);
		//
		const accs = await getGetAccs(addr);
		const [pubk, sign] = (addr) ? await getUpdSign(addr) : ["", ""];
		const answ = (pubk) 
			? await getGetcard(host, nick , pubk, sign, accs) 
			: await getGetcard(host, nick);
		//
		if (typeof answ == "object") return answ;
		return Promise.reject(answ);
	} catch (err) {
		return Promise.reject(err);
	}
}

function __CU$ ({}) {
	//params
	const params = useParams();
	const host = params.host || "127.0.0.1";
	const nick = params.nick || "";
	//signals
	const [error, setError] = createSignal(false);
	const [added, setAdded] = createSignal(false);
	const [data, setData] = createStore({card: false});
	//
	useGetcard(host, nick)
		.then((res) => {
			setData({card: res});
		})
		.catch(err => {
			console.log(err);
			setError(err);
		});
	//
	return (
		<Show when = {data.card} fallback = {<Loading />}>
			<CardScene 
				permission = { data.card.pack[0] } 
				mode = {"view"} 
				card = {data.card} 
			/>
		</Show>
	);
}


export default __CU$;
