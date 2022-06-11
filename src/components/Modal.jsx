import { children } from "solid-js";
import { Portal } from "solid-js/web";
import page_styles from "../modules/Modal.module.scss";

function Modal (props) {
	const resolved = children(() => props.children);
	return (
		<Portal>
			<div id = {props.id} class= {page_styles.Modal}>
				{resolved()}
			</div>
		</Portal>
	);
}

export default Modal;
