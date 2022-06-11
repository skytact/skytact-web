import {Show, createSignal} from "solid-js";
//
import getDeliver from "../fetch/getDeliver";
//
import page_styles from "../modules/DigestMail.module.scss";

const useDeliver = async (link, mail) => {
	try {
		const answ = await getDeliver(link, mail);
		return typeof answ == "boolean" ? answ : Promise.reject("проверьте данные!");
	} catch (err) {
		console.log(err);
		return Promise.reject("ошибка при отправке сообщения!");
	}
}

function DigestMail ({ link = () => "", defaultValue = "", onText = f => f, onError = f => f }) {
	//timer signal
	const [timerValue, setTimerValue] = createSignal(0);
	const [email, setEmail] = createSignal(defaultValue);
	//timer interval
	const eachSecond = setInterval(() => {
		if (timerValue() > 0) {
			const newTimerValue = timerValue() - 1;
			setTimerValue(newTimerValue);
		}
	}, 1000);
	//onclick 
	const onClick = e => {
		e.preventDefault();
		setTimerValue(60);
		const ref = link();
		console.log(ref);
		//valid email
		const mailPattern = /^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		const mail = email().trim();
		if (!mail.length || !mailPattern.test(mail)) {
			onError("введите корректный адрес эл.почты!");
			return; //turbokirichenko@mail.ru
		}
		if (!ref) {
			onError("отсутствует имя пользователя!");
			return;
		}
		useDeliver(ref, mail)
			.then(res => {
				//
				console.log('mail send');
			})
			.catch(err => {
				//
				console.log(err);
				onError(err);
			});
	}
	//return form
	return (
		<div class = {page_styles.DigestMail}>
			<input
				maxlength = "48"
				type = "email"
				name = "email"
				value = { email() }
				placeholder = "адрес эл.почты"
				onInput = { e => {
					setEmail(e.target.value);
					onText(e);
				}}
			/>
			<div class = {page_styles.SendButton}>
				<Show when = {timerValue() < 1} fallback = {
					<div>
						{
							`${Math.floor(timerValue()/60)}:${Math.floor(timerValue()%60) > 10
								? Math.floor(timerValue()%60)
								: "0" + Math.floor(timerValue()%60)
							}`
						}
					</div>
				}>
					<button onClick = { onClick }>
						отправить код
					</button>
				</Show>
			</div>
		</div>
	)
}

export default DigestMail;
