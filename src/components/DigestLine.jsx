import {children} from "solid-js";
import page_styles from "../modules/DigestLine.module.scss";
function DigestLine (props) {
	const resolved = children(() => props.children)
	return (
		<div class = {page_styles.DigestLine}>
			{ resolved() }
		</div>
	)
}
export default DigestLine;
