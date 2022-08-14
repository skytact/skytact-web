import {Link} from "solid-app-router";

//components
import Header from "../components/Header.jsx";
import Heading from "../components/Heading.jsx";
import Texture from "../components/Texture.jsx";
import DigestWrap from "../components/DigestWrap.jsx";
import CircleWithTextAndImage from "../components/CircleWithTextAndImage.jsx";
import CloudBackground from "../components/CloudBackground.jsx";
import FootCard from "../components/FootCard.jsx";
//modules
import page_styles from "../modules/M.module.scss";
//content
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
//
function __M$ () {
	return (
		<CloudBackground height = {800} >
			<Header />
			<Heading header = {"Skytact?"}/>
			{/*}<Texture>
			    <div>
				    Войдя в <span>постковидный мир</span>, мы с досадой обнаружили:
				    теперь единственное, что нас связывает&nbsp;- <span>Гиперссылка</span>.
				    А всё, что у нас осталось, теперь храниться далеко, в хрупких
				    электронных ящиках...
			    </div>
			    <div>
				    Наш цифровой профиль стал неотделим от нашей <span>идентичности</span>.
				    Душа человека теперь полностью исчерпывается набором данных по углам интернета.
				   	Чтобы познакомиться - мало пары юрких фраз и номера мобильного
				    на бумажке. Нужно представить свой цифровой <span>образ</span> тоже...
			    </div>
			</Texture>*/}
			<Texture>
			    <div class = {page_styles.MarketBlock}>
   					<h3>Это решение, позволяет создать свою цифровую визитку.</h3>
   				</div>
   				<div>
   					<span>Если есть:</span> инста, вк, телега, эл.почта, рабочая почта, ссылка на соц сеть,
   					ссылка на мессенджер, номер мобильного, github, криптокошелёк,
   					цитата , анекдот, фотка&nbsp;c&nbsp;котиком, 
   					2-я&nbsp;фотка&nbsp;с&nbsp;🐱, 3-я&nbsp;фотка&nbsp;с&nbsp;🐱, объявление на авито,
   					электронный сертификат о прохождении курса программирования на питоне 🐍 
   					- <b>всё это,</b> легко можно разместить
   					на своей цифровой визитке. А потом идти и показывать её новым знакомым!
   				</div>
   				<div class = {page_styles.MarketBlock}>
	 				<h3>Удиви новой прогрессивной визиткой!</h3>
				</div>
				<div class = {page_styles.MarketBlock}>
					<h3>Реактивный доступ через QR&nbsp;code!</h3>
				</div>
				<div class = {page_styles.MarketBlock}>
					<h3>Твоя личная ссылка:</h3>
					<span>skytact.online/your-name</span>
				</div>
				<div class = {page_styles.MarketBlock}>
					<h3>Защищенный&nbsp;доступ через&nbsp;ssl&nbsp;протокол!</h3>
				</div>
				<div>
					<p><a href="/r">{">>>"} Присоединиться {"<<<"}</a></p>
				</div>
			</Texture>
			<div class = {page_styles.Footer}>
				<Link href="/h">вернуться</Link>
			</div>
		</CloudBackground>
	)
}

export default __M$;
