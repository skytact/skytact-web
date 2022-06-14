import {Show, createSignal} from "solid-js";
import {Link} from "solid-app-router";
//
import AuthorZone from "./AuthorZone";
import BreezeButton from "./BreezeButton";
//
import useData from "../libs/useData";
//
import getGetAddr from "../fetch/getGetAddr";
import getContact from "../fetch/getContact";
import getUpdSign from "../fetch/getUpdSign";
import getIsfree from "../fetch/getIsfree";
import page_styles from "../modules/AddButton.module.scss";

import hello from "../icons/hello.svg";
//
const useContact = async (host, nick) => {
	try {
		//required
		console.log(host, nick);
		const addr = await getGetAddr(host, nick);
		console.log(addr);
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
const useIsfree = async (host, upc) => {
	//
	try {
		const answ = await getIsfree(host, upc);
		console.log(answ);
		return typeof answ == "boolean" ? answ : Promise.reject("некорректные данные");
	} catch (err) {
		return Promise.reject("ошибка доступа к серверу!");
	}
}
//
function RegistrationLink ({host, nick, upcode}) {
	const h = true;
	const [signUpAccess, setSignUpAccess] = createSignal(false);
	useIsfree(host, upcode)
		.then(res => {
			setSignUpAccess(res);
		})
		.catch(err => {
			setSignUpAccess(false);
		})
	//when registration is access then get link, another way get phrase
	return (
		<Show when = {signUpAccess()} fallback = {
			<div></div>
		}>
			<div class = {page_styles.Registration}>
					<Link href={`/r/${upcode}?n=${nick}&h=${h ? host : ""}`}>
						регистрация
					</Link>
					<div class = {page_styles.RegBall}>
						<div></div>
					</div>
			</div>
		</Show>
	);
}
//
function AddButton ({permission, host, nick, upcode, onList = f => f}) {
	//state of contact button
	const [state, setState] = createSignal(permission == "added" ? true : false);
	//contact form
	const onSubmit = e => {
		e.preventDefault();
		if(!state()) 
			useContact(host, nick)
				.then(res => {
					setState(true);
					const [link] = useData()
					onList({ref: `${link}`});
				})
				.catch(err => {
					console.log(err);
					setState(false);
				});
	}
	//<RegistrationLink host = {host} nick = {nick} upcode = {upcode} />
	const onSignUp = e => {
		e.preventDefault();
		console.log(state());
		if(!state())
			useIsfree(host, upcode)
				.then(res => {
					console.log(res);
					window.location.href = (res == true)
						? `/r/${upcode}?n=${nick}&h=${host || ""}`
						: `/l?u=${nick}&h=${host || ""}`
				})
				.catch(err => {
					console.log(err);
					setState(false);
				});
	}
	console.log('good');
	//
	return (
		<AuthorZone fallback = {
			permission != "owner" && 
			<div id = "_statusButton" class = {page_styles.AddButtonWrapper }>
				<BreezeButton color = {"#6dccf2"} state = {state} onSubmit = {onSignUp}>
					{/* <div>👋</div> */}
					<img src = {hello} />
				</BreezeButton>
			</div>
		}>
			{ permission != "owner" && 
			<div id = "_statusButton" class = {page_styles.AddButtonWrapper }>
				<BreezeButton color = {"#6dccf2"} state = {state} onSubmit = {onSubmit}>
					{/* <div>👋</div> */}
					<img src = {hello} />
				</BreezeButton>
			</div>}
		</AuthorZone>
	);
}
//
export default AddButton;
