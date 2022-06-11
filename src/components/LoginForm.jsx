import {Link} from "solid-app-router";

import DigestForm from "./DigestForm";
import DigestInput from "./DigestInput";
import DigestPassword from "./DigestPassword";
import DigestSubmit from "./DigestSubmit";
import DigestButton from "./DigestButton";
import DigestLine from "./DigestLine";

function LoginForm ({error, data, onInputData, onSubmit}) {
	return (
		<DigestForm
			profil = "отмена"
			href = "/"
			error = {error}
			heading = "Вход в аккаунт"
			onSubmit = {onSubmit}
		>
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
				<DigestButton style = "border: none;" 
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
		</DigestForm>
	)
}

export default LoginForm;
