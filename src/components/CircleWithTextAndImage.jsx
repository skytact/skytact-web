import { children } from "solid-js";

import page_styles from "../modules/CircleWithTextAndImage.module.scss"

import qr from "../icons/qr.svg";

//
function CircleWithTextAndImage (props) {
	const imageSrc = props.img || qr;
	const resolved = children(() => props.children);
	return (
		<div class = {page_styles.Scene}>
			<div class = {page_styles.Circle} style = {props.left ? "float: left;" : "float: right;"}>
				<div>
					<img src = {imageSrc} />
				</div>
				<p>
					{resolved}
				</p>
			</div>
		</div>
	);
}

//
export default CircleWithTextAndImage;
