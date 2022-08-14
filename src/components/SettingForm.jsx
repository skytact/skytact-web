import {Link} from "solid-app-router";
import {createSignal, Show} from "solid-js";

import DigestScene from "../components/DigestScene";
import DigestSpec from "../components/DigestSpec";
import DigestPassword from "../components/DigestPassword";
import DigestInput from "../components/DigestInput";
import DigestMail from "../components/DigestMail";
import DigestSubmit from "../components/DigestSubmit";
import DigestButton from "../components/DigestButton";

import useData from "../libs/useData";
import parseLink from "../libs/parseLink";

import getAuthorized from "../fetch/getAuthorized";
import getGetcard from "../fetch/getGetcard";
import getIsfree from "../fetch/getIsfree";

import page_styles from "../modules/SettingForm.module.scss";

//
const useGetcard = async (host, nick) => {
	try {
		//
		const answ = await getGetcard(host, nick);
		//
		if (typeof answ == "object") return answ;
		return Promise.reject(answ);
	} catch (err) {
		return Promise.reject(err);
	}
}

//
const useIsfree = async (host, code) => {
	try {
		//
		const answ = await getIsfree(host, code);
		//
		return Promise.resolve(answ);
	} catch (err) {
		return Promise.reject(err);
	}
}

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

	const [upcode, setUpcode] = createSignal(false);
	const ulink = code => "https://skytact.online/r/" + code;
	
	return (
		<DigestScene profil = "обратно" heading = "Настройки">
			<div>
				<DigestSpec>
					<span>Пригласить друга</span>
					<Show when = {upcode()} fallback = {
						<div class = {page_styles.GetUplink}>
							<button onclick = {e => {
								const [host, nick] = parseLink(link);
								if (!upcode())
									useGetcard(host, nick)
										.then(res => {
											const cardPack = res.pack;
											useIsfree(host, res.pack[4])
												.then(res => {
													if (res) setUpcode(ulink(cardPack[4]));
													else setUpcode("over");
												})
												.catch(err => console.log(err));
										})
										.catch(err => {
											setUpcode(false);
										});
							}}>
								Получить пригласительную ссылку
							</button>
						</div>
					}>
						<Show when = {upcode() != "over"} fallback = {
							<div class = {page_styles.UplinkOver}>
								<div>Кажется у Вас закончились приглашения!</div>
							</div>
						}>
							<div class = {page_styles.UpcodeBlock}>
								<span>Скопируй текст ниже и отправь</span>
								<div class = {page_styles.Uplink}>
									{upcode()}
								</div>
							</div>
						</Show>
					</Show>
				</DigestSpec>
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
							style = "color: #F23827; border: 1px solid #F23827;"
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
							style = "color: #F23827; border: 1px solid #F23827;"
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
