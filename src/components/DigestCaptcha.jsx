import {Show, createSignal} from "solid-js";
//
import page_styles from "../modules/DigestCaptcha.module.scss";
//
import refresh from "../icons/refresh.svg";
//
import parseLink from "../libs/parseLink";
import getCaptcha from "../fetch/getCaptcha";
//
const useCaptcha = async (link) => {
	try {
		const [host] = parseLink(link);
		const answ = await getCaptcha(host || "127.0.0.1");
		if (typeof answ == "object") {
			return answ;
		} return Promise.reject("неизвестная ошибка!");
	} catch (err) {
		console.log(err);
		return Promise.reject("ошибка соединения с сервером!");
	}
}
//
function DigestCaptcha ({ link = () => "", defaultValue = "", onText = f => f, onHash = f => f }) {
	//captcha signal
	const [captcha, setCaptcha] = createSignal(false);
	//update captcha
	const onCaptcha = (e) => {
		e.preventDefault();
		useCaptcha(link())
			.then(res => {
				onHash(res.text);
				setCaptcha(res.svg);
			})
			.catch(err => {
				console.log(err);
			})
	}
	//get captcha
	useCaptcha(link())
		.then(res => {
			onHash(res.text);
			setCaptcha(res.svg);
		})
		.catch(err => {
			console.log(err);
		})
	//return form
	return (
		<div class = {page_styles.DigestMail}>
			<input
				maxlength = "6"
				type = "text"
				name = "captcha"
				placeholder = "код справа"
				onInput = { e => {
					onText(e);
				}}
			/>
			<div class = {page_styles.Captcha}>
				{captcha() && <img src = {captcha()}  />}
			</div>
			<div class = {page_styles.SendButton}>
				<button onclick = { onCaptcha }>
					<img src= {refresh} />
				</button>
			</div>
		</div>
	)
}

export default DigestCaptcha;
