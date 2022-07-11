//libs
import { Link } from "solid-app-router";
import { createSignal } from "solid-js";
//components
import Header from "../components/Header";
import Heading from "../components/Heading";
import CloudBackground from "../components/CloudBackground";
//styles
//modules
import page_styles from "../modules/H.module.scss";
//images
import skytacts_icon from "../icons/logoSky.svg";
import githubicon from "../icons/github.svg";

function __H$ () {
	//set current href from networking page
	const currentNHref = "https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%BB%D0%B5%D0%B7%D0%BD%D1%8B%D0%B5_%D1%81%D0%B2%D1%8F%D0%B7%D0%B8";
	const [networkingHref, setNetworkingHref] = createSignal(currentNHref);
	//
	return (
		<div>
			<CloudBackground height = {800}>
				<Header />
				<div class={page_styles.GitHubLink}>
					<a href="https://github.com/skytact">
						<img src = {githubicon} />
					</a>
				</div>
				<div class={page_styles.Credo}>
					<h1><p><a href={networkingHref()}>Нетворкинг</a></p><p>здесь!</p></h1>
				</div>
				<div class={page_styles.LinkWrap}>
					<Link href="/r">Присоединиться</Link>
				</div>
				<div class={page_styles.LinkWrap}>
					<Link href="/l">Есть аккаунт</Link>
				</div>
				<div class={page_styles.LinkWrap}>
					<Link href="/c">Поиск</Link>
				</div>
				{/*}<div class={page_styles.LinkWrap}>
					<Link href="/m">Манифест</Link>
				</div>*/}
				<div class = {page_styles.Texture}>
					<h3>Skyatact?</h3>
   					<span>Если есть</span> 
   					инста, вк, телега, эл.почта, рабочая почта, ссылка на соц сеть,
   					ссылка на мессенджер, номер мобильного, github, криптокошелёк,
   					цитата , анекдот, фотка&nbsp;c&nbsp;котиком, 
   					2-я&nbsp;фотка&nbsp;с&nbsp;🐱, 3-я&nbsp;фотка&nbsp;с&nbsp;🐱, объявление на авито,
   					электронный сертификат о прохождении курса программирования на питоне 🐍
   					<p><b>всё это,</b> легко можно разместить
   					на своей цифровой визитке.
   					А потом идти и показывать её новым знакомым!</p>
   					<a href = "https://skytact.online/republichenko">мой пример</a>
   				</div>				
				<div class={page_styles.Signature}>
					created by <a href="https://skytact.online/republichenko">#republichenko</a>
					
				</div>
			</CloudBackground>
		</div>
	);
}

export default __H$;
