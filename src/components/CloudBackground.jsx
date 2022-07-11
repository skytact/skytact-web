import { children } from "solid-js";
import CloudImg from "./CloudImg";
import page_styles from "../modules/CloudBackground.module.scss";

function CloudBackground (props) {
	const resolved = children(() => props.children)
	const startPos = d =>
		Math.floor(Math.random() * 40 + 10 + d);

	const f = startPos(0);
	const m = startPos(10);
	const l = startPos(20);
	
	return (
		<>
			<div class = { page_styles.Noise }></div>
			<div class = { page_styles.CloudBackground } >
				<CloudImg top = "20px" startPosition = {l - 20}  />
				<CloudImg top = "140px" startPosition = {f + 20}  />
				<CloudImg top = "260px" startPosition = {f}  />
				<CloudImg top = "380px" startPosition = {m + 10}  />
				<CloudImg top = "500px" startPosition = {m - 10} />
				<CloudImg top = "440px" startPosition = {l} />
			</div>
			{ resolved() }
		</>
	)
}

export default CloudBackground;
