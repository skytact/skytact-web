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
//
function __M$ () {
	return (
		<CloudBackground height = {800} >
			<Header />
			<Heading header = {"Пролог"}/>
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
			    <div>
   					<a href = "https://skytact.online/">Skytact</a>
   					- это решение, позволяющее создать свою цифровую визитку.
   				</div>
   				<div>
   					<span>Если у вас есть:</span> инста, вк, эл.почта, рабочая почта, ссылка на соц сеть,
   					ссылка на мессенджер, номер мобильного, github, ...hub,
   					рабочий номер, пацанская цитата, криптокошелёк, фотка&nbsp;c&nbsp;котиком, 
   					2&nbsp;фотка&nbsp;с&nbsp;🐱, 3&nbsp;фотка&nbsp;с&nbsp;🐱, старый анекдот - всё это, легко можно разместить
   					на визитной карточке. И идти показывать её новым знакомым.
   				</div>
   				<div>
   					<span>Реактивный  доступ будет обеспечен через QR code!</span>
   				</div>
   				<img src= {anatomy}/>
			</Texture>
			<Texture>
				<b style = {"color: red;"}>Просто так зарегистрироваться не получится!</b>
				<p><a href="/r">Читай инструкцию</a></p>
			</Texture>
			<div class = {page_styles.Footer}>
				<Link href="/h">вернуться</Link>
			</div>
		</CloudBackground>
	)
}

export default __M$;
