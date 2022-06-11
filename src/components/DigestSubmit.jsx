import {children} from "solid-js";
import page_styles from "../modules/DigestSubmit.module.scss";

function DigestSubmit (props) {
	const resolved = children(() => props.children);
	return (
		<div class = {page_styles.DigestSubmit}>
			{ resolved() }
		</div>
	);
}
//
export default DigestSubmit;
