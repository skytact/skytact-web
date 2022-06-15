//libs
import {createSignal} from "solid-js";
import { Link } from "solid-app-router";
//components
import Header from '../components/Header.jsx';
import Heading from '../components/Heading.jsx';
import BreezeButton from "../components/BreezeButton.jsx";
import CloudBackground from "../components/CloudBackground.jsx";
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
			<Heading header={ru_heading}/>
			<div class={page_styles.Texture}> 
				<div><span>Для регистрации</span> нужно сделать следующее:</div>
				<div><span>раз:</span> Найти пользователя, у которого есть <b>приглашение</b></div>
				<div><span>два:</span> Через QR или ссылку откройте его профиль</div>
				<div><span>три:</span> Сразу заметите: 
					<div 
						style = "display: inline-block; position: relative; z-index: 10; margin: 0 0 10px 24px;"
					>
					<BreezeButton width = {"30px"} height = {"30px"} color = {"#6dccf2"} state = {() => false}>
						<div style = "font-size: 20px; margin-top: 10px;">👋</div>
					</BreezeButton>
					</div>
				</div>
				<p style = "margin-top: 28px;">Для каждого аккаунта открыто <b>4&nbsp;приглашения</b>,
				если приглашений не осталось, вместо регистрации откроется страница <b>входа&nbsp;в&nbsp;аккаунт</b>!</p>
			</div>
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
		</CloudBackground>
	);
}

export default __R$;
