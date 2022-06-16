import {createSignal} from "solid-js";

import ErrorLine from "../components/ErrorLine";
import Header from "../components/Header";
import Heading from "../components/Heading";
import SearchForm from "../components/SearchForm";

import parseLink from "../libs/parseLink";
import getOverlap from "../fetch/getOverlap";

import page_styles from "../modules/C.module.scss";

const useOverlap = async (name) => {
	const answ = await getOverlap(name);
	if (typeof answ == "boolean")
		return answ;
	return Promise.reject(answ);
}

function __C$ ({}) {
	const [error, setError] = createSignal(false);
	const [input, setInput] = createSignal("");
	const onSubmit = (e) => {
		e.preventDefault();
		const link = input();
		let [host, name] = parseLink(link);
		if (name[0] == "#") name = name.substr(1, name.length);
		useOverlap(host + "/" + name)
			.then(res => {
				console.log(res);
				if(res) {
					window.location.href = `/${name}`;
				}
				else {
					setError("такого имени не существует");
				}
			})
			.catch(err => {
				console.log(err);
				setError(err);
			});
	}
	return (
		<SearchForm
			error = {error}
			input = {input}
			setInput = { setInput }
			onSubmit = { onSubmit }
		/>
	);
}

export default __C$;
