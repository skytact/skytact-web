import {children, createSignal} from "solid-js";

import page_style from "../modules/HyperCardWrapper.module.scss";

import getUpdcard from "../fetch/getUpdcard";

import logoSky from "../icons/logoSky.svg";

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

//return function
function HyperCardWrapper (props) {
	//
	const footPhrase = props.displayMode() == "edit" 
		? "чтобы изменить ТЕМУ"
		: props.permission == "guest" 
			? "чтобы отправить <span style='color: #000'>👋</span> Привет!"
			: "чтобы ВЫЙТИ"
		
	//VALUE
	//array of bg colors
	const colorList = ["#CA2132", "#F7960B", "#F9F9F9", "#83DCFA", "#404040"];
	const background = props.card.style || "#CA2132";
	const responsed = children(() => props.children);

	const [afterClick, setAfterClick] = createSignal(false);
	const [bgRound, setBgRound] = createSignal({x: false, y: false});

	//set bg color index
	let indexOfColor = 0;
	colorList.forEach((n,i) => {if (n == props.card.data.fname) indexOfColor = i});
	const [bgColor, setBgColor] = createSignal(indexOfColor);

	const changeBg = (event, bg = false) => {
		const posX = event.clientX || event.touches[0].clientX;
		const posY = event.clientY || event.touches[0].clientY;

		console.log(posX, posY);
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
		const list = JSON.parse(JSON.stringify(props.card.list));
		console.log('yes');
		list.push({key: 'none', ref: 'null'});
		props.onChangeCard({...props.card, list});
		console.log(props.card.list);
		console.log(list);
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
				: props.permission == "guest" ? addToFriend() : exitFromGuest();
			setAfterClick(false);
		} else {
			//
			setTimeout(() => { setAfterClick(false)}, 238);
			setAfterClick(true);
		}
	}
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
			<div 
				class = {page_style.BgBox}
			>
			{bgRound().x && bgRound().y &&
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
			}
			</div>
			<div class = {page_style.Child}>
				{ responsed() }
				<div class = {page_style.FootPhrase}>
					<p>нажми дважды</p> 
					<p innerHTML = {footPhrase} />
				</div>
				<div class = {page_style.FootCopyright}>
					<a href = '/'><img src = {logoSky} /></a> <span>skytact.online &#169; 2022</span>
				</div>
			</div>
		</div>	
	);
}

export default HyperCardWrapper;
