import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Link } from "solid-app-router";
import Modal from "./Modal";

import getUpdcard from "../fetch/getUpdcard.jsx";

import page_styles from "../modules/ChangeNameModal.module.scss";

import close from "../icons/close.svg";

const useUpdcard = async (obj) => {
	console.log(obj);
	let result = true;
	try {
		for (var key in obj) {
			const answ = await getUpdcard(key, obj[key]);
		}
	} catch (err) {
		return Promise.reject(err);
	}
	return result;
}

function ChangeNameModal ({name = () => "", status = () => "", setName = f => f, setStatus = f => f}) {
	const [error, setError] = createSignal(false);
	const [input, setInput] = createStore({
		fullname: name()  ? name() : "",
		status: status()  ? status() : "",
	});
	const onName = (e) => {
		setInput({
			fullname: e.target.value,
			status: input.status
		});
	};
	const onStatus = (e) => {
		setInput({
			fullname: input.fullname,
			status: e.target.value,
		});
	};
	const onSubmit = (e) => {
		e.preventDefault();
		//
		const fname = input.fullname;
		let intro = input.status;
		//without any changes
		if (fname == name() && intro == status()) {
			const modal = document.getElementById("changeFullName");
			modal.style.display = "none";
		}
		intro = intro.replaceAll("\"", "\\\"");
		useUpdcard({fname, intro})
			.then(res => {
				setName(fname);
				setStatus(input.status);
				const modal = document.getElementById("changeFullName");
				modal.style.display = "none";
			})
			.catch(err => {
				setError(err);
			});
	}
	return (
		<Modal id = "changeFullName">
			<div class = {page_styles.Header}>
				<button onCLick = {(event) => {
					event.preventDefault();
					const modal = document.getElementById("changeFullName");
					modal.style.display = "none";
				}}>
					<img src={close} />
				</button>
			</div>
			<div class= {page_styles.FormWrapper}>
				<div>{error() && <span>{error()}</span>}</div>
				<form onSubmit = {onSubmit} >
					<div class= {page_styles.InputWrapper}>
						<input 
							name="fname"
							type="text"
							value= {input.fullname}
							placeholder="Как Вас зовут?"
							maxlength = "27"
							onInput = {onName}
						/>
					</div>
					<div class= {page_styles.TextWrapper}>
						<textarea
							name="status"
							placeholder="Расскажите о себе"
							cols = "42"
							rows = "3"
							maxlength = "96"
							onInput = {onStatus}
						>
							{input.status.replaceAll("\\", "")}
						</ textarea>
					</div>
					<div class={page_styles.ButtonWrapper}>
						<button>
							<span>сохранить</span>
						</button>
					</div>
				</form>
			</div>
		</Modal>
	)
}

export default ChangeNameModal;
