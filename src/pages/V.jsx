import { createSignal, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import RecoveryForm from "../components/RecoveryForm";

import getRecover from "../fetch/getRecover";

const useRecover = async (link, mail, code, npwd) => {
	//
	try {
		const answ = await getRecover(link, mail, code, npwd);
		return answ === true ? answ : Promise.reject("неизвестная ошибка!");
	} catch (err) {
		return Promise.reject(err);
	}
}

function __V$ () {
	//
	const [error, setError] = createSignal("");
	const [data, setData] = createStore({
		link: "",
		pass: "",
		conf: "",
		mail: "",
		code: "",
	});
	//
	const onInputData = (link, pass, conf, mail, code) => {
		setError("");
		setData({
			link,
			pass,
			conf,
			mail,
			code
		});
	}
	//
	const onSubmit = (e) => {
		e.preventDefault();
		const mailPattern = /^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (data.pass.length < 8) {
			setError("пароль короткий!");
		}
		if (data.pass != data.conf) {
			setError("пароли не совпадают!");
		}
		if (!mailPattern.test(data.mail)) {
			setError("некорректный адрес эл.почты");
		}
		if (data.code.length != 6) {
			setError("некорректный код доступа!");
		}
		if (!error()) 
			useRecover(data.link, data.mail, data.code, data.pass)
				.then(res => {
					window.location.href = '/l';
				})
				.catch(err => {
					setError(err);
				});
		
	}
	//
	const onError = (err) => setError(err);
	//
	return (
		<RecoveryForm 
			error = { error }
			data = {data}
			onInput = {onInputData}
			onSubmit = { onSubmit }
			onError = { onError }
		/>
	);
}

export default __V$;
