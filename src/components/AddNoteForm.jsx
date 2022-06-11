//functions
import {Link, Navigate} from "solid-app-router";
import {createSignal, createEffect} from "solid-js";
import {createStore} from "solid-js/store";
//components
import DigestForm from "../components/DigestForm";
import DigestIconsRadio from "../components/DigestIconsRadio";
import DigestInput from "../components/DigestInput";
import DigestTextarea from "../components/DigestTextarea";
import DigestSubmit from "../components/DigestSubmit";
import DigestButton from "../components/DigestButton";
//fetch
import getAddnote from "../fetch/getAddnote";
//content
import logoSky from "../icons/logoSky.svg";
import back from "../icons/back.svg";
import lock from "../icons/iconBar/lock.svg";
import open from "../icons/iconBar/open.svg";
//fetching
const useAddnote = async (note) => {
	const answ = await getAddnote(note);
	return answ ? true : Promise.reject(answ);
}
//
function AddNoteForm ({}) {
	const [error, setError] = createSignal(false);
	const [inputData, setInputData] = createStore({
		icon: "info",
		line: "",
		text: "",
		lock: false,
	});
	const setIcon = (icon) => {
		setError(false);
		setInputData({
			...inputData,
			icon: icon.target.value,
		});
	}
	const setLine = (line) => {
		setError(false);
		setInputData({
			...inputData,
			line: line.target.value,
		});
	}
	const setText = (text) => {
		setError(false);
		setInputData({
			...inputData,
			text: text.target.value,
		});
	}
	const setLock = (lock) => {
		setInputData({
			...inputData,
			lock,
		})
	}
	//
	const onSubmit = event => {
		//
		event.preventDefault();
		//
		const note = inputData;
		if(!error()) useAddnote(note)
			.then(res => {
				window.location.href = '/e';
			})
			.catch(err => {
				setError(err);
				console.log(error());
			});
	}
	return (
		<DigestForm
			profil = "профиль"
			href = "/e"
			error = {error}
			heading = "Новая запись"
			onSubmit = { onSubmit }
		>
			<DigestIconsRadio setIcon = {setIcon} />
			<DigestTextarea 
				maxLen = {"120"} 
				placeholder = "ссылка, телефон, эл.почта, адрес, кошелек"
				defaultText = ""
				onText = { setLine }
			/>
			<DigestInput maxLen = {"38"} placeholder = "оставьте комментарий..." onText = {setText} />
			<DigestSubmit>
				<DigestButton 
					onSet = {() => { 
						if(!inputData.icon || !inputData.line)
								setError('Нужно заполнить обязательное поле!');
						setLock(false);
					}}
				>
						<img src={open} />
						<span>создать открытую запись</span>
				</DigestButton>
				<DigestButton
					style="border: 1px solid red"
					onSet = {() => {
						if(!inputData.icon || !inputData.line)
										setError('Нужно заполнить обязательное поле!');
						setLock(true);
					}}
				>
					<img src={lock} />
					<span>создать приватную запись</span>
				</DigestButton>
			</DigestSubmit>
		</DigestForm>
	)
}
export default AddNoteForm;
