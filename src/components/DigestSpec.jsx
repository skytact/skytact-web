import { children, Show } from "solid-js";

import page_styles from "../modules/DigestSpec.module.scss";

function DigestSpec (props) {
	const resolved = children(() => props.children);
	return (
		<div class = {page_styles.DigestSpec}>
			{resolved()}
		</div>	
	);
}

export default DigestSpec;
