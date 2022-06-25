import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import DigestScene from "../components/DigestScene";
import SettingForm from "../components/SettingForm";

import clearData from "../libs/clearData";
import getUpdpass from "../fetch/getUpdpass";
import getUpdmail from "../fetch/getUpdmail";

const useUpdpass = async (pwd, updpwd) => {
	try {
		const answ = await getUpdpass(pwd, updpwd);
		return answ;
	} catch(err) {
		return Promise.reject("Ошибка! Повторите ввод!")
	}
}

const useUpdmail = async (mail, code) => {
	try {
		const answ = await getUpdmail(mail, code);
		return answ;
	} catch (err) {
		return Promise.reject("Ошибка доступа к серверу!");
	}
}

function __S$ () {
	//
	const [error, setError] = createSignal("");
	const [success, setSuccess] = createSignal("");
	const [data, setData] = createStore({
		pwd: "",
		npwd: "",
		cpwd: "",
	});
	//
	const [email, setEmail] = createStore({
		mail: "",
		code: "",	
	});
	//
	const onInputEmail = (mail, code) => {
		setSuccess("");
		setError("");
		setEmail({
			mail,
			code,
		});
	}
	//
	const onSend = (e) => {
		e.preventDefault();
		if (email.code.length > 6) {
			setError("Неправильный код доступа!");
		}
		if (!error())
			useUpdmail(email.mail, email.code)
				.then(res => {
					try {
						const [name, addr] = res.split('@');
						const hideName = name.length > 2 
							? name.substr(0, 2) + '*'.repeat(name.length - 2)
							: '*'.repeat(name.length - 2);
						//
						setSuccess("Почта изменена на: " + hideName + '@' + addr);
					} catch (err) {
						setSuccess("Почта изменена");
					}
				})
				.catch(err => {
					//
					setError(err);
				});
	}
	//
	const onInputPassword = (pwd, npwd, cpwd) => {
		setSuccess("");
		setError("");
		setData({
			pwd,
			npwd,
			cpwd
		});
	}
	//
	const onSubmit = e => {
		e.preventDefault();
		if (data.npwd.length < 8)
			setError("пароль должен быть длиннее!");
		if (data.cpwd != data.npwd) 
			setError("пароли не совпадают");
		if (!error()) {
			useUpdpass(data.pwd, data.npwd)
				.then(res => {
					setSuccess("Пароль изменён успешно!");
					//
					//window.location.href = "/e";
				})
				.catch(err => {
					setError(err);
				});
		} else {
			setData({
				pwd: data.pwd,
				npwd: "",
				cpwd: "",
			});
		}
	}
 	//
	const onExit = () => {
		if(clearData())
			window.location.href = "/h";
	}
	//
	const onError = (err) => setError(err);
	const onSuccess = (i) => setSuccess(i);
	//
	return (
		<SettingForm 
			error = { error }
			success = { success }
			email = { email }
			onEmail = { onInputEmail }
			onSend = { onSend }
			data = { data }
			onPassword = { onInputPassword }
			onSubmit = { onSubmit }
			onExit = { onExit } 
			onError = { onError }
			onSuccess = { onSuccess }
		/>
	);
}

export default __S$;
