import {Show, createSignal} from "solid-js";
import {createStore} from "solid-js/store";
import {useParams, Link} from "solid-app-router";

import DigestForm from "./DigestForm";
import DigestInput from "./DigestInput";
import DigestPassword from "./DigestPassword";
import DigestSubmit from "./DigestSubmit";
import DigestButton from "./DigestButton";
import DigestCaptcha from "./DigestCaptcha";
import MarketingText from "./MarketingText";
import DigestSpec from "./DigestSpec";
import useContactData from "../libs/useContactData";

//import getAddcard from "../fetch/getAddcard";

function RegistrationForm ({error, data, onInput, onOverlap, onSubmit = f => f}) {
	//
	return (
		<DigestForm
			profil = "отмена"
			href = "/"
			error = {error}
			heading = "Создание гиперкарты"
			onSubmit = { onSubmit }
		>
			<DigestSpec>
			<DigestInput 
				maxLen = "32" 
				placeholder = "придумай новое имя"
				defaultValue = { data.link }
				onText = { e => {
					onInput(e.target.value, data.passwd, data.conf, data.text, data.hash);
					onOverlap(e.target.value);
				}}
			/>
			<DigestPassword  
				defaultValue = { data.passwd }
				onText = { e => {
					onInput(data.link, e.target.value, data.conf, data.text, data.hash);
				}}
			/>
			<DigestPassword 
				placeholder = "пароль еще раз"
				defaultValue = { data.conf }
				onText = { e => {
					onInput(data.link, data.passwd, e.target.value, data.text, data.hash);
				}}
			/>
			<DigestCaptcha 
				placeholder = "код справа"
				defaultValue = { data.text }
				onText = { e => {
					//input capcha code
					onInput(data.link, data.passwd, data.conf, e.target.value, data.hash);
				}}
				onHash = { hash => {
					//input capcha hash
					onInput(data.link, data.passwd, data.conf, data.text, hash);
				}}
			/>
			<DigestSubmit>
				<DigestButton>
					создать
				</DigestButton>
				<DigestButton 
					style = "border: none;" 
					onSet = { e => {
							const [host, nick] = useContactData()	
							e.preventDefault();
							window.location.href = `/l?n=${nick || ""}&h=${host || ""}`;
					}}
				>
					уже есть аккаунт
				</DigestButton>
			</DigestSubmit>
			</DigestSpec>
		</DigestForm>
	);
}

export default RegistrationForm;
