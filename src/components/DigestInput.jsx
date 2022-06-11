//
import page_styles from "../modules/DigestInput.module.scss";
//
function DigestInput ({maxLen = "38", placeholder = "...", defaultValue = "", onText = f => f}) {
	return (
		<div class = {page_styles.DigestInput}>
			<input
				maxlength = { maxLen }
				type="text"
				name="text"
				value = { defaultValue }
				placeholder = { placeholder }
				onInput = { onText }
			/>
		</div>
	)
}
//
export default DigestInput;
