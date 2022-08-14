import {Link} from "solid-app-router";

import DigestForm from "./DigestForm";
import DigestInput from "./DigestInput";
import DigestPassword from "./DigestPassword";
import DigestSubmit from "./DigestSubmit";
import DigestButton from "./DigestButton";
import DigestLine from "./DigestLine";
import DigestSpec from "./DigestSpec";
import CloudPhrase from "./CloudPhrase";

function LoginForm ({error, data, onInputData, onSubmit}) {
	const greeting = "Привет! Введи имя и пароль, чтобы войти в свой аккаунт. Если вдруг забыл пароль, нажми - \"не помню\"!";
	return (
		<>
		<DigestForm
			profil = "отмена"
			href = "/"
			error = {error}
			heading = "Вход в аккаунт"
			onSubmit = {onSubmit}
		>
			<DigestSpec>
				<DigestInput 
					maxLen = "32" 
					defaultValue = {data.link}
					placeholder = "здесь #имя_пользователя"
					onText = {(e) => {
						onInputData(e.target.value, data.passwd);
					}}
				/>
				<DigestPassword
					defaultValue = {data.passwd}
					placeholder = "здесь пароль"
					onText = {(e) => {
						onInputData(data.link, e.target.value);
					}}
				/>
				<DigestSubmit>
					<DigestButton
					>
						Войти
					</DigestButton>
					<DigestButton
						onSet = { e => {	
								e.preventDefault();
								window.location.href = "/v";
					}}>
						<Link href = "/v">не помню</Link>
					</DigestButton>
				</DigestSubmit>
				<DigestLine>
					<Link href = "/r">как зарегистрироваться?</Link>
				</DigestLine>
			</DigestSpec>
		</DigestForm>
		<CloudPhrase message={greeting} />
		</>
	)
}

export default LoginForm;
