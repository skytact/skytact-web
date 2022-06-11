import {Show} from "solid-js";
import {Navigate} from "solid-app-router";
import Loading from "./Loading";
import page_styles from "../modules/ErrorPlace.module.scss";

//
function ErrorPlace ({error}) {
	return (
		<Show when= {error()} fallback = {<Loading />}>
			<Navigate href = "/h" />
		</Show>
	);
}
export default ErrorPlace;
