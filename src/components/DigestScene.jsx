import { children } from "solid-js";
import { Link } from "solid-app-router";
//
import DigestWrap from "../components/DigestWrap";
//
import page_styles from "../modules/DigestScene.module.scss";
//
import back from "../icons/back.svg";
//
function DigestScene (props) {
	//
	const resolved = children(() => props.children);
	//
	const onClick = e => {
		e.preventDefault();
		history.back();
	}
	//
	return (
		<DigestWrap>
			<div class = {page_styles.Header}>
				<button onClick = {onClick}>
					<img src={back} />
					{props.profil && 
					<span>
						{props.profil}
					</span>}
				</button>
			</div>
			<div class = {page_styles.Block}>
				<div class={page_styles.Heading}>
					<h1>{props.heading}</h1>
				</div>
				{ resolved() }
			</div>
		</DigestWrap>
	)
}
export default DigestScene;
