//libs
import { Link } from "solid-app-router";
import { createSignal } from "solid-js";
//style
import header_styles from "../modules/Header.module.scss";
//content
import logo from "../icons/logoSky.svg";

function Header (props) {
	return (
		<header class = {header_styles.Header}>
			<Link href="/">
				<div class = {header_styles.ImageWrapper}>
					<img src = {logo}/>
				</div>
			</Link>
				<div><h1>skytacts</h1></div>
		</header>
	);
}
export default Header;
