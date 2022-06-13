import { children } from "solid-js";
import CloudImg from "./CloudImg";
import page_styles from "../modules/CloudBackground.module.scss";

function CloudBackground (props) {
	const resolved = children(() => props.children)
	const startPos = () =>
		Math.floor(Math.random() * 40 + 30);
	return (
		<>
			<div class = { page_styles.CloudBackground } style = {`height: ${props.height || "600"}px`}>
				<CloudImg top = "20px" startPosition = {startPos() + 5} />
				<CloudImg top = "140px" startPosition = {startPos() + 5} reverse = {true} />
				<CloudImg top = "260px" startPosition = {startPos() - 7} />
				<CloudImg top = "380px" startPosition = {startPos() - 7} reverse = {true} />
				<CloudImg top = "500px" startPosition = {startPos() + 9}/>
				<CloudImg top = "440px" startPosition = {startPos() - 3}/>
			</div>
			{ resolved() }
		</>
	)
}

export default CloudBackground;
