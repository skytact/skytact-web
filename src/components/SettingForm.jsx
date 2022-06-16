import {Link} from "solid-app-router";

import DigestScene from "../components/DigestScene";
import DigestSpec from "../components/DigestSpec";
import DigestPassword from "../components/DigestPassword";
import DigestInput from "../components/DigestInput";
import DigestMail from "../components/DigestMail";
import DigestSubmit from "../components/DigestSubmit";
import DigestButton from "../components/DigestButton";

import useData from "../libs/useData";
import parseLink from "../libs/parseLink";

import page_styles from "../modules/SettingForm.module.scss";

function SettingForm ({
	error = "", 
	success = "",
	email,
	onEmail = f => f,
	onSend = f => f,
	data, 
	onPassword = f => f, 
	onSubmit = f => f, 
	onExit = f => f,
	onError = f => f,
	onSuccess = f => f,
}) {
	const [link] = useData(); 
	return (
		<DigestScene profil = "обратно" heading = "Настройки">
			<div>
				<div class = {page_styles.Error}>
					{error() && <span>{error()} </span>}
					{success() && <span style = "color: #5fd35f">{success()}</span>}
				</div>
				<DigestSpec success = {success} >
					<span>Добавить или изменить почту</span>
					<DigestMail  
						link = {() => link}
						defaultValue = { email.mail.trim() }
						onText = { e => {
							onEmail(e.target.value, email.code);
						}}
						onError = { onError }
					/>
					<DigestInput 
						maxLen = {6}
						placeholder = "код подтверждения" 
						defaultValue = { email.code.trim() }
						onText = { e => {
							onEmail(email.mail, e.target.value);
						}}
					/>
					<DigestSubmit>
						<DigestButton onSet = { onSend } >
							Подтвердить						
						</DigestButton>
					</DigestSubmit>
				</DigestSpec>
				<DigestSpec success = {success} >
					<span>Изменить пароль</span>
					<DigestPassword 
						placeholder = "твой старый пароль" 
						defaultValue = { data.pwd.trim() }
						onText = {e => {
							onPassword(e.target.value, data.npwd, data.cpwd);
						}}
					/>
					<DigestPassword 
						placeholder = "здесь новый пароль"
						defaultValue = { data.npwd.trim() }
						onText = {e => {
							onPassword(data.pwd, e.target.value, data.cpwd);
						}}
					/>
					<DigestPassword 
						placeholder = "здесь повтори пароль" 
						defaultValue = { data.cpwd.trim() }
						onText = {e => {
							onPassword(data.pwd, data.npwd, e.target.value);
						}}
					/>
					<DigestSubmit>
						<DigestButton 
							style = "color: red; border: 1px solid red;"
							onSet = { onSubmit }
						>
							Изменить
						</DigestButton>
					</DigestSubmit>
				</DigestSpec>
				<DigestSpec>
					<span>Режим просмотра</span>
					<DigestSubmit>
						<DigestButton
							onSet = {e=>{
								e.preventDefault;
								const [host, name] = parseLink(link);
								window.location.href = "/" + name;
							}}
						>
							Перейти					
						</DigestButton>
					</DigestSubmit>
				</DigestSpec>
				<DigestSpec>
					<DigestSubmit>
						<span>Выход из аккаунта</span>
						<DigestButton 
							style = "color: red; border: 1px solid red;"
							onSet = { onExit }
						>
							Выйти
						</DigestButton>
					</DigestSubmit>
				</DigestSpec>
			</div>
		</DigestScene>
	)
}
export default SettingForm;
