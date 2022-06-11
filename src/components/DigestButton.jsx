import {children} from "solid-js";
import page_styles from "../modules/DigestButton.module.scss";
//
function DigestButton (props) {
	const resolved = children(() => props.children);
	return (
		<div class = {page_styles.DigestButton}>
			<button
				type = "submit"
				style = {props.style || ""}
				onClick = { props.onSet }
			>
				{resolved()}
			</button>
		</div>
	)
}

export default DigestButton;
