import {Show} from "solid-js";
import page_styles from "../modules/ErrorLine.module.scss";

function ErrorLine ({error}) {
	return (
		<Show when = {error()} fallback = {<span></span>}>
			<div class = {page_styles.ErrorLine}>
				<span>{error()}</span>
			</div>
		</Show>
	)
}

export default ErrorLine;
