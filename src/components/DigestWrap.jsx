import {children} from "solid-js";
import FootCard from "../components/FootCard";

import page_styles from "../modules/DigestWrap.module.scss";

function DigestWrap (props) {
	const resolved = children(() => props.children);
	return (
		<div class = {page_styles.DigestWrap}>
			{resolved() }
			<FootCard />
		</div>
	)
}

export default DigestWrap;
