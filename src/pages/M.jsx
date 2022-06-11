import {Link} from "solid-app-router";

//components
import Header from "../components/Header.jsx";
import Heading from "../components/Heading.jsx";
import Texture from "../components/Texture.jsx";
//modules
import page_styles from "../modules/M.module.scss";
//content
import anatomy from "../icons/anatomy.svg";
function Manifest_1 () {
	return (
		<>
			<div><p><a href="#">Гиперссылка</a> - теперь это единственная вещь, связывающая нас.
			Душа человека - теперь полностью исчерпывается набором данных по углам Интернета. 
			А всё, что у нас осталось, хранится далеко, в хрупких железных ящиках.
			Стены соцсетей - наша альтернативная внешность, ещё более яркая и обманчивая. 
			Чтобы познакомиться, уже не хватает лишь пары юрких фраз и номера мобильного на бумажке. 
			Иногда нужно представить свой цифровой образ тоже.</p></div>
			Мы разработали концепцию, чтобы упростить переход от оффлайн-знакомства к онлайну.
			Быстро и легко, без лишних хлопот, через <a href="#">QR код</a>, ты можешь поделиться своим 
			цифровым профилем и рассказать о себе больше, чем можно просто увидеть.
		</>
	)
}
function Manifest_2 () {
	return (
		<>
			<div><p>
			Атомарная единица нашей сети - это <a href="#">Гиперкарта</a>, в неё ты можешь добавить необходимую
			информацию о себе или о своём деле. Фотографии, телефоны, мессенджеры, соц сети, ссылки
			криптокошельки - всё это, на одной странице и в локаничном формате. 
			</p></div>
			<div><b>Данный проект прошу воспринимать, не иначе, как элемент Искусства.</b></div>
		</>
	)
}
//
function __M$ () {
	return (
		<div>
			<Header />
			<Heading header="Манифест основателей проекта" />
			<Texture>
				<Manifest_1 />
			</Texture>
			<div class={page_styles.ImageWrapper}>
				<img src={anatomy}/>
			</div>
			<Texture>
				<Manifest_2 />
			</Texture>
			<div class={page_styles.Footer}>
				<Link href="/">вернуться</Link>
			</div>
		</div>
	)
}

export default __M$;
