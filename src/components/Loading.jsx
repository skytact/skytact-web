import { Link } from "solid-app-router";
import page_styles from "../modules/Loading.module.scss";
import loading from "../icons/galaxy-loading.svg";
function Loading () {
	return (
		<div class={page_styles.Loading}>
			<Link href="/h"><img src={loading} /></Link>
		</div>
	)
}
export default Loading;
