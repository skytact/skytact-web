//
import page_styles from "../modules/DigestInput.module.scss";
//
function DigestPassword ({
	maxLen = "256", 
	placeholder = "придумай пароль, и не забудь его!",
	defaultValue = "",
	onText = f => f
}) {
	//
	return (
		<div class = {page_styles.DigestInput}>
			<input
				maxlength = { maxLen }
				type="password"
				name="text"
				value = {defaultValue}
				placeholder = { placeholder }
				onInput = { onText }
			/>
		</div>
	)
}

export default DigestPassword;
