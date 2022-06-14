import {Link} from "solid-app-router";
import logoSky from "../icons/logoSky.svg";

import page_styles from "../modules/FootCard.module.scss";

function FootCard ({}) {
	return (
		<div class = {page_styles.FootCard}>
			<Link href="/">
				<img src={logoSky} />
			</Link>
		</div>
	)
}

export default FootCard;
