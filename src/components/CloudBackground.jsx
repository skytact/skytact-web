import { children } from "solid-js";
import CloudImg from "./CloudImg";
import page_styles from "../modules/CloudBackground.module.scss";

function CloudBackground (props) {
	const resolved = children(() => props.children)
	const startPos = () =>
		Math.floor(Math.random() * 20 + 30);
	return (
		<>
			<div class = { page_styles.Noise }></div>
			<div class = { page_styles.CloudBackground } >
				<CloudImg top = "20px" startPosition = {startPos()}  />
				<CloudImg top = "140px" startPosition = {startPos()}  />
				<CloudImg top = "260px" startPosition = {startPos()}  />
				<CloudImg top = "380px" startPosition = {startPos()}  />
				<CloudImg top = "500px" startPosition = {startPos()} />
				<CloudImg top = "440px" startPosition = {startPos()} />
			</div>
			{ resolved() }
		</>
	)
}

export default CloudBackground;
