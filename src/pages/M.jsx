import {Link} from "solid-app-router";

//components
import Header from "../components/Header.jsx";
import Heading from "../components/Heading.jsx";
import Texture from "../components/Texture.jsx";
import DigestWrap from "../components/DigestWrap.jsx";
import CircleWithTextAndImage from "../components/CircleWithTextAndImage.jsx";
import CloudBackground from "../components/CloudBackground.jsx";
//modules
import page_styles from "../modules/M.module.scss";
//content
import anatomy from "../icons/anatomy.svg";
import lock from "../icons/iconBar/lock.svg";
import link from "../icons/iconBar/link.svg";

const text = () => { return "123";/*<div><p><a href="#">Гиперссылка</a> - теперь это единственная вещь, связывающая нас.
			Душа человека - теперь полностью исчерпывается набором данных по углам Интернета. 
			А всё, что у нас осталось, хранится далеко, в хрупких железных ящиках.
			Стены соцсетей - наша альтернативная внешность, ещё более яркая и обманчивая. 
			Чтобы познакомиться, уже не хватает лишь пары юрких фраз и номера мобильного на бумажке. 
			Иногда нужно представить свой цифровой образ тоже.</p></div>*/}
			{/*<div><p>В мире, где <a href="#">Гиперссылка</a> - единственное, что нас связывает.
			А всё, что у нас осталось, хранится в хрупких электронных ящиках.
			</p></div>*/}

function Manifest_1 () {
	return (
		<>
			<div>
				Мы разработали <span>концепцию</span>, чтобы упростить знакомства между людьми.
			</div>

		</>
	)
}
function Manifest_2 () {
	return (
		<>
			<div><b>Данный проект прошу воспринимать, не иначе, как элемент Искусства.</b></div>
		</>
	)
}
//
function __M$ () {
	return (
		<CloudBackground height = {800} >
			<Header />
			<Heading header="О проекте" />
			
			<Texture>
				<Manifest_1 />
			</Texture>

			<Texture>
				Быстро и <span>легко</span>, без лишних хлопот, через <span>QR код</span>, 
				ты можешь поделиться своим цифровым профилем и рассказать о 
				себе больше, чем можно просто увидеть.
			</Texture>
			<div class={page_styles.ImageWrapper}>
				<img src={anatomy}/>
			</div>
			
			<Texture>
				<p><a href = '#'>Гиперкарта</a> - это фотографии, телефоны, мессенджеры, 
				соц сети, ссылки, криптокошельки - всё, на одной странице 
				и в локаничном формате.</p>
			</Texture>
			<Texture>
				<Manifest_2 />
			</Texture>
			<div class={page_styles.Footer}>
				<Link href="/">вернуться</Link>
			</div>
		</CloudBackground>
	)
}

export default __M$;
