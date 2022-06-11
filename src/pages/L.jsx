import { createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { Link, Navigate } from "solid-app-router";
//componenets
import LoginForm from "../components/LoginForm";
//libs
import parseLink from "../libs/parseLink";
import usePromContact from "../libs/usePromContact";
//fetch
import getAuthorized from "../fetch/getAuthorized";
import getAthCard from "../fetch/getAthCard";
//styles

//modules
import page_styles from "../modules/L.module.scss";

//
const Author = async () => {
	const auth = await getAuthorized(); //return true, false or error string
	return typeof auth === "boolean" ? auth : Promise.reject(auth);
}

//
const AthData = async (link, passwd = false) => {
	if (!passwd) return Promise.reject("wrong password!!!");
	const athCard = await getAthCard(link, passwd); //return true or error string
	if (athCard == true) {
		const contact = await usePromContact();
		console.log(contact);
		return athCard;
	}
	//else
	return Promise.reject(athCard);
}

function __L$ () {
	//input data
	const [inputData, setInputData] = createStore({
		link: "",
		passwd: ""
	})
	//signals
	const [authorized, setAuthorized] = createSignal(false);
	const [error, setError] = createSignal("");
	//authorized signal
	Author()
		.then(res => {
			setAuthorized(res);
		})
		.catch(err => {
			console.log(err);
			setError(err);
		});
	//update input store
	const onInputData = (link, passwd) => {
		setError("");
		setInputData({
			link,
			passwd
		});
	}
	const onSubmit = event => {
		//turn off default event
		event.preventDefault();
		//auth function
		const link = inputData.link;
		const passwd = inputData.passwd;
		let [host, name] = parseLink(link);
		if (name[0] == "#") name = name.substr(1, name.length);
		//
		AthData(host + "/" + name, passwd)
			.then(res => {
				console.log('?'+res);
				setAuthorized(res);
			})
			.catch(err => {
				console.log(err);
				setError("неправильное имя или пароль");
			});
	}
	//
	return (<>
		{
			authorized()
			? <Navigate href="/e" />
			: <LoginForm 
				error = { error }
				data = { inputData } 
				onInputData = { onInputData }  
				onSubmit = { onSubmit }
			/>
		}
		</>)
}

export default __L$;
