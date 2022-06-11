import {children} from "solid-js";
import {Link} from "solid-app-router";
import FootCard from "./FootCard";

import page_styles from "../modules/CardForm.module.scss";

import back from "../icons/back.svg";

function CardForm (props) {
	const resolved = children(() => props.children);
	return (
		<div class={page_styles.CardForm}>
			<div class = {page_styles.Header}>
				<button>
					<img src={back} />
					{props.profil && <span><Link href= {props.href || "/"}>{props.profil}</Link></span>}
				</button>
			</div>
			{resolved()}
			<FootCard />
		</div>
	)
}

export default CardForm;
