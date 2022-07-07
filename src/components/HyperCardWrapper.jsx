import {children, createSignal} from "solid-js";

import page_style from "../modules/HyperCardWrapper.module.scss";

//return function
function HyperCardWrapper (props) {

	const colorList = ["#CA2132", "#F7960B", "#F9F9F9", "#83DCFA", "#404040"];
	const background = props.card.style || "#CA2132";
	const responsed = children(() => props.children);

	const [afterClick, setAfterClick] = createSignal(false);
	const [bgRound, setBgRound] = createSignal({x: false, y: false});
	const [bgColor, setBgColor] = createSignal(0);

	const changeBg = (event, bg = false) => {
		const posX = event.clientX || event.touches[0].clientX;
		const posY = event.clientY || event.touches[0].clientY;

		console.log(posX, posY);
		setBgRound({x: posX, y: posY});
		setTimeout(() => { 
			setBgRound({x: false, y: false});
			setBgColor((bgColor() + 1)%5);
		}, 800);
	}

	const addToFriend = () => {
		const list = JSON.parse(JSON.stringify(props.card.list));
		list.push({key: 'none', ref: 'null'});
		props.onChangeCard({...props.card, list});
		console.log(props.card.list);
		console.log(list);
	}

	const dbClick = (e) => {
		//
		//e.preventDefault();
		//
		if (afterClick()) {
			props.displayMode() == "edit" ?	changeBg(e) : addToFriend();
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
				"overflow-Y": props.move() ? "hidden" : "scroll"
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
					<p>нажми 2 раза</p> 
					{
						(props.displayMode() != "edit")	
						? (<p>чтобы отправить <span style="color: #000">👋</span> ПРИВЕТ!</p>)
						: (<p>чтобы поменять ТЕМУ!</p>)
					}
				</div>
			</div>
		</div>	
	);
}

export default HyperCardWrapper;
