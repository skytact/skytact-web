import {children, createSignal, Show, createEffect} from "solid-js";

import page_style from "../modules/HyperCardWrapper.module.scss";
//
import useData from "../libs/useData";
import parseLink from "../libs/parseLink";
//
import getAuthorized from "../fetch/getAuthorized";
import getGetAddr from "../fetch/getGetAddr";
import getContact from "../fetch/getContact";
import getUpdSign from "../fetch/getUpdSign";
import getIsfree from "../fetch/getIsfree";
import getUpdcard from "../fetch/getUpdcard";

import logoSky from "../icons/logoSky.svg";
import waveHello from "../icons/waveHello.gif";
import firework from "../icons/firework.gif";

//
const useAuthorized = async () => {
	try {
		const answ = await getAuthorized();
		return Promise.resolve(answ);
	}
	catch (err) {
		return Promise.reject(err);
	}
}

//
const useContact = async (host, nick) => {
	try {
		//required
		const addr = await getGetAddr(host, nick);
		//
		const accs = "";
		const [pubk, sign] = (addr) ? await getUpdSign(addr) : ["", ""];
		const answ = (nick && pubk && sign)
			? await getContact(host, nick, pubk, sign)
			: false;
		if (!answ) return Promise.reject("act canceled!")
		return answ;
	} catch (err) {
		return Promise.reject(err);
	}
}

//
const useUpdcard = async (text) => {
	try {
		//
		const answer = await getUpdcard("fname", text);
		return answer || Promise.reject(false);
	} catch (err) {
		//
		throw new Error("new error")
	}
}

//

//return function
function HyperCardWrapper (props) {
		
	//VALUE
	//array of bg colors
	const colorList = ["#FFBF00", "#BDDB00", "#B5BAFF", "#83DCFA", "#404040"]; // ["#CA2132", "#F7960B", "#F9F9F9", "#83DCFA", "#404040"];
	const background = props.card.style || "#83DCFA";
	const responsed = children(() => props.children);

	const [afterClick, setAfterClick] = createSignal(false);
	const [bgRound, setBgRound] = createSignal({x: false, y: false});
	const [guest, setGuest] = createSignal(props.permission == "guest");
	const [added, setAdded] = createSignal(false);

	//depend values
	const footPhrase = props.displayMode() == "edit" 
		? "чтобы изменить ТЕМУ"
		: guest() != "guest" 
			? "чтобы отправить <span style='color: #000'>👋</span> Привет!"
			: "чтобы ВЫЙТИ";

	//set bg color index
	let indexOfColor = 0;
	colorList.forEach((n,i) => {if (n == props.card.data.fname) indexOfColor = i});
	const [bgColor, setBgColor] = createSignal(indexOfColor);

	const changeBg = (event, bg = false) => {
		const posX = event.clientX || event.touches[0].clientX;
		const posY = event.clientY || event.touches[0].clientY;

		setBgRound({x: posX, y: posY});
		setTimeout(() => { 
			const selectColor = colorList[(bgColor() + 1)%5];
			useUpdcard(selectColor)
				.then(res => {
					setBgRound({x: false, y: false});
					setBgColor((bgColor() + 1)%5);
				})
				.catch(err => {
					console.log(err);
				});
		}, 800);
	}

	const addToFriend = () => {
		if(!authorized()) window.location.href = "/";
		const list = JSON.parse(JSON.stringify(props.card.list));
		const host = props.card.head.host;
		const nick = props.card.data.nick;
		const [link] = useData();
		useContact(host, nick)
			.then(res => {
				const [myhost, mynick] = parseLink(link);
				return getGetAddr(myhost, mynick);
			})
			.then(res => {
				list.unshift({key: res, ref: link});
				props.onChangeCard({...props.card, list});
				setGuest(false);
				setAdded(true);
				setTimeout(e => {
					setAdded(false);
				}, 1800)
			})
			.catch(err => {
				console.log(err);
			});
	}

	const exitFromGuest = () => {
		window.location.href = "/";
	}

	const dbClick = (e) => {
		//
		//e.preventDefault();
		//
		if (afterClick()) {
			e.preventDefault();
			props.displayMode() == "edit" 
				? changeBg(e) 
				: guest() ? addToFriend() : exitFromGuest();
			setAfterClick(false);
		} else {
			//
			setTimeout(() => { setAfterClick(false)}, 238);
			setAfterClick(true);
		}
	}

	//authorized
	const [authorized, setAuthorized] = createSignal(false);

	useAuthorized()
		.then(res => {
			setAuthorized(res);
		})
		.catch(err => console.log(err));

	createEffect(() => { if(!authorized()) console.log('auth' + true); });
	
	
	return (
		<div
			class = {page_style.HyperCardWrapper} 
			style = {{
				"background-color": colorList[bgColor()],
				"overflow-Y": props.move() ? "hidden" : "scroll",
				"touch-action": props.move() ? "none" : "manipulation"
			}}
			onclick = {dbClick}
		>
			{bgRound().x && bgRound().y &&
			<div class = {page_style.BgBox}>
				<div 
					style = {{
						"top": bgRound().y + "px",
						"left": bgRound().x + "px",
						"width": "300%",
						"height": "300%",
						"background-color": colorList[(bgColor() + 1)%5]
					}}
					class = {page_style.BgRound}
				>
				</div>
			</div>
			}
			
			<div class = {page_style.Child}>
				{ responsed() }
				<Show when = {authorized()} fallback = {
					<div 
						class = {page_style.CommePhrase}
						onclick = {e => {
							const host = props.card.head.host;
							const code = props.card.pack[4];
							getIsfree(host, code)
								.then(res => {
									if (res) window.location.href = '/r/' + props.card.pack[4];
									else window.location.href = '/';
								})
								.catch(err => {
									console.log(err);
									window.location.href = '/';
								});
						}}
					>
						<div>
						 	создай себе такую же <span>здесь</span>
						</div>
					</div>
				}>
					<div class = {page_style.FootPhrase}>
						<p>нажми дважды</p> 
						<p innerHTML = {footPhrase} />
					</div>
				</Show>
				<div class = {page_style.FootCopyright}>
					<a href = '/'><img src = {logoSky} /></a> <span>skytact.online &#169; 2022</span>
				</div>
			</div>
			{added() && 
			<div class = {page_style.BgFirework}>
				<img class = {page_style.WaveHello} src = {waveHello} />
				<img class = {page_style.FireworkLeft} src = {firework} />
				<img class = {page_style.FireworkRight} src = {firework} />
			</div>
			}
		</div>	
	);
}

export default HyperCardWrapper;
