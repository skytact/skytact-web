//libs
import {createSignal} from "solid-js";
import { Link } from "solid-app-router";
//components
import Header from '../components/Header.jsx';
import Heading from '../components/Heading.jsx';
import Texture from "../components/Texture.jsx";
import BreezeButton from "../components/BreezeButton.jsx";
import CloudBackground from "../components/CloudBackground.jsx";
import DigestSpec from "../components/DigestSpec";
//styles
//modules
import page_styles from "../modules/R.module.scss";
//content
import firstStep from "../icons/scanImg.svg";
import secondStep from "../icons/linkImg.svg";
import frigthStep from "../icons/enterData.svg";
import skytacts_icon from "../icons/logoSky.svg";

function __R$ () {
	const ru_heading = "Регистрация аккаунта в Skytact";
	const en_heading = "Register an account with Skytacts";
	//
	return (
		<CloudBackground height = {800}>
			<Header />
			<DigestSpec>
			<Heading header= {"Для Регистрации:"}/>
			<Texture> 
				<div class = {page_styles.MarketBlock}>Найдите <b style="color: red">приглашение</b></div>
				<div class = {page_styles.MarketBlock}>Это ссылка, которую может вам дать любой, <b style="color: red">уже зарегистрированный</b>, пользователь</div>
				<div class = {page_styles.MarketBlock}>Тогда, Вы сможете создать свой аккаунт</div>
			</Texture>
			{/*<div class = {page_styles.WrapImageBlockLeft}>
				<img src={firstStep}/>
			</div>
			<div class = {page_styles.WrapImageBlockRigth}>
				<img src={secondStep}/>
			</div>
			<div class = {page_styles.WrapImageBlockLeft}>
				<img src={frigthStep}/>
			</div>*/}
			<div class = {page_styles.Footer}>
				<Link href="/h">вернуться</Link>
			</div>
			</DigestSpec>
		</CloudBackground>
	);
}

export default __R$;
