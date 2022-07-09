import {children} from "solid-js";
import FootCard from "../components/FootCard";
import CloudBackground from "../components/CloudBackground";

import page_styles from "../modules/DigestWrap.module.scss";

function DigestWrap (props) {
	const resolved = children(() => props.children);
	return (
		<div class = {page_styles.DigestWrap}>
			{resolved() }
		</div>
	)
}

export default DigestWrap;
