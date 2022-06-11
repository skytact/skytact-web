import {children} from "solid-js";
import {Link} from "solid-app-router";

import DigestScene from "./DigestScene";
import FootCard from "./FootCard";

import page_styles from "../modules/DigestForm.module.scss";

import back from "../icons/back.svg";

function DigestForm (props) {
	//
	const resolved = children(() => props.children);
	//
	return (
		<DigestScene profil = {props.profil} heading = {props.heading}>
			<div class={page_styles.ErrorBlock}>
				{ props.error() && <span>{props.error()}</span> }
			</div>
			<form onSubmit = {props.onSubmit}>
				{resolved()}
			</form>
		</DigestScene>
	);
}

export default DigestForm;
