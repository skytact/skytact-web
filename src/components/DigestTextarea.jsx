
import page_styles from "../modules/DigestTextarea.module.scss";

function DigestTextarea ({maxLen = "120", placeholder = "...", defaultText = "", onText = f => f}) {
	return (
		<div class = {page_styles.DigestTextarea}>
			<textarea
				maxlength = {maxLen}
				required
				row = "4"
				cols = "48"
				placeholder = {placeholder}
				onInput = {onText}
			>
				{ defaultText }
			</textarea>
		</div>
	);
}

export default DigestTextarea;
