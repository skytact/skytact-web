import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { useParams } from "solid-app-router";

import DigestForm from "./DigestForm";
import DigestSpec from "./DigestSpec";
import DigestInput from "./DigestInput";
import DigestMail from "./DigestMail";
import DigestPassword from "./DigestPassword";
import DigestSubmit from "./DigestSubmit";
import DigestButton from "./DigestButton";

function RecoveryForm ({
	error = () => "", 
	data = {}, 
	onInput = f => f, 
	onSubmit = f => f, 
	onError = f => f
}) {
	//
	const [link, setLink] = createSignal("");
	return (
		<DigestForm 
			error = {error} 
			profil = "отмена" 
			heading = "Восстановление пароля"
			href = "/"
			onSubmit = { onSubmit }
		>
			<DigestSpec>
			<DigestInput 
				maxLen = "32"
				placeholder = "здесь #имя аккаунта"
				defaultValue = { data.link.trim() }
				onText = { e => {
					setLink(data.link);
					onInput(e.target.value, data.pass, data.conf, data.mail, data.code);
				}}
			/>
			<DigestMail 
				link = { link }
				defaultValue = { data.mail.trim() }
				onText = { e => {
					setLink(data.link);
					onInput(data.link, data.pass, data.conf, e.target.value, data.code);
				}}
				onError = { onError }
			/>
			<DigestInput 
				maxLen = {6}
				placeholder = "код подтверждения" 
				defaultValue = { data.code.trim() }
				onText = { e => {
					onInput(data.link, data.pass, data.conf, data.mail, e.target.value);
				}}
			/>
			</DigestSpec>
			<DigestSpec>
				<span>Новый пароль</span>
				<DigestPassword 
					placeholder = "здесь новый пароль"
					defaultValue = { data.pass.trim() }
					onText = { e => {
						onInput(data.link, e.target.value, data.conf, data.mail, data.code);
					}}
				/>
				<DigestPassword 
					placeholder = "здесь повтори пароль"
					defaultValue = { data.conf.trim() }
					onText = { e => {
						onInput(data.link, data.pass, e.target.value, data.mail, data.code);
					}}
				/>
				<DigestSubmit>
					<DigestButton>
						Подтвердить
					</DigestButton>
				</DigestSubmit>
			</DigestSpec>
		</DigestForm>
	)
}

export default RecoveryForm;
