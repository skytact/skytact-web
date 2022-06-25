import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useParams } from "solid-app-router";
import RegistrationForm from "../components/RegistrationForm";

import parseLink from "../libs/parseLink";
import getAddcard from "../fetch/getAddcard";
import getOverlap from "../fetch/getOverlap";
import usePromContact from "../libs/usePromContact";

const useOverlap = async (link) => {
	//
	try {
		//
		const answ = await getOverlap(link);
		return answ;
	} catch (err) {
		//
		return Promise.reject(err);
	}
}

const useAddcard = async (link, pwd, code, text, hash) => {
	try {
		const answ = await getAddcard(link, pwd, code, text, hash);
		if (typeof answ == "object") {
			await usePromContact();
			return answ;
		}
		throw new Error ("connection failed");
	} catch (err) {
		return Promise.reject(err);
	}
}

function __RC$ () {
	const upcode = useParams().upcode;
	const [error, setError] = createSignal("");
	const [data, setData] = createStore({
		link: "",
		passwd: "",
		conf: "",
		text: "",
		hash: ""
	});
	//
	const onOverlap = (value) => {
		value = value.trim();
		if (value.length > 3) {
			useOverlap(value)
				.then(res => {
					if (res == true) 
						setError("имя уже занято!");
					else
						setError("");
				})
				.catch(err => {
					setError("проверьте введенные данные!");
				});
		} else 
			setError("имя слишком короткое!")
	}
	//
	const onInput = (link, passwd, conf, text, hash) => {
		setError("");
		setData({
			link: link.trim(),
			passwd: passwd,
			conf: conf,
			text: text,
			hash: hash,
		});
	}
	//
	const validateData = (name, pwd, pwd2) => {
		if (name < 3) {
			setError("имя должно быть длиннее!");
			return false;
		}
		if (pwd.length < 8) {
			setError("пароль должен быть длиннее!");
			return false;
		}
		if (pwd != pwd2) {
			setError("пароли не совпадают!");
			return false;
		}
		const regexpStart = new RegExp(`^[a-zA-Z]{1}`);
		const regexpName = new RegExp(`^[a-zA-Z]{1}[a-zA-Z0-9_]{3,31}$`);
		if (name.length > 32) {
			setError("имя длиннее 32 символов!");
			return false;
		}
		if (!regexpStart.test(name)) {
			setError("имя должно начинаться с буквы!");
			return false;
		}
		if (!regexpName.test(name)) {
			setError("некорректное имя!");
			return false;
		}
		return true;
	}
	const onSubmit = (e) => {
		e.preventDefault();
		const [host, name] = parseLink(data.link.trim());
		console.log(data.text, data.hash);
		if(validateData(name, data.passwd, data.conf)) {
			useAddcard(data.link.trim(), data.passwd, upcode, data.text, data.hash)
				.then(res => {
					//
					window.location.href = "/e";
				})
				.catch(err => {
					//
					if (err == 'wrong captcha' || err == 'wrong data') {
						//
						setError("неправильный код с картинки!");
					} else {
						//
						setError(err);
					}
				});
		}
	}
	//
	return  (
		<RegistrationForm 
			error = {error}
			data = {data}
			onInput = { onInput }
			onOverlap = {onOverlap}
			onSubmit = {onSubmit}
		/>
	);
}

export default __RC$;
