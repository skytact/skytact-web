//libs
import { Link } from "solid-app-router";
import { createSignal } from "solid-js";
//components
import Header from "../components/Header";
//styles
//modules
import page_styles from "../modules/H.module.scss";
//images
import skytacts_icon from "../icons/logoSky.svg";

function __H$ () {
	//set current href from networking page
	const currentNHref = "https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BB%D0%B5%D0%B7%D0%BD%D1%8B%D0%B5_%D1%81%D0%B2%D1%8F%D0%B7%D0%B8";
	const [networkingHref, setNetworkingHref] = createSignal(currentNHref);
	//
	return (
		<div>
			<Header />
			<div class={page_styles.Credo}>
				<h1><a href={networkingHref()}>Нетворкинг</a> - здесь!</h1>
			</div>
			<div class={page_styles.LinkWrap}>
				<Link href="/r">Присоединиться</Link>
			</div>
			<div class={page_styles.LinkWrap}>
				<Link href="/l">Уже есть аккаунт</Link>
			</div>
			<div class={page_styles.LinkWrap}>
				<Link href="/c">Поиск аккаунта</Link>
			</div>
			<div class={page_styles.LinkWrap}>
				<Link href="/m">Манифест</Link>
			</div>
			<div class={page_styles.Signature}>
				created by <a href="http://skytact.online/c/republichenko">#republichenko</a>
			</div>
		</div>
	);
}

export default __H$;
